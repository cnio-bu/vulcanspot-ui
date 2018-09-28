SELECT
   ga.symbol AS gene_a,
   a.alteration as gene_a_alteration,
   c.name AS context,
   
   gb.symbol AS gene_b,
   gb.role AS gene_b_role,
   gb.driver AS gene_b_driver,
   array_to_string( array_agg(DISTINCT ds.name ), ',' ) AS evidence,
   count(DISTINCT ds.name) AS evidencen,
   max(r.score) as rscore,
   d.name AS drug_name,
   (select il.score from lnk_genes_drugs il where il.id_drugs = d.id and il.id_genes = gb.id and il.id_contexts = c.id and il.id_sources = 1) as score_pandrugs,
   (select il.score from lnk_genes_drugs il where il.id_drugs = d.id and il.id_genes = gb.id and il.id_contexts = c.id and il.id_sources = 2) as score_lincs

FROM 
    genes ga,
    genes gb,
    genetic_alterations a,
    relationships r,
    contexts c,
    lnk_genes_drugs l,
    datasets ds,
    drugs d

WHERE true
    AND ga.id = a.id_genes
    AND a.id = r.id_genetic_alterations
    AND gb.id = r.id_genes_B
    AND a.id_contexts = c.id
    AND c.id = l.id_contexts
    AND gb.id = l.id_genes
    AND ds.id = r.id_datasets
    AND l.id_drugs = d.id
    
    AND (
            (l.id_sources = 1 AND l.score >= 0.6)
        or
            (l.id_sources = 2 AND l.score >= 0.95)
        )
        
    ##FILTERS##

GROUP BY
    ga.symbol,
    a.alteration,
    c.name,
    gb.symbol,
    gb.role,
    d.name,
    
    d.id,
    gb.id,
    c.id
    
ORDER BY
    ga.symbol,
    a.alteration,
    gb.symbol,
    c.name,
    d.name,
    evidencen DESC
;
