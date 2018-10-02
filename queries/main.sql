
SELECT
   ga.symbol AS gene_a,
   a.alteration as gene_a_alteration,
   c.name AS context,
   
   gb.symbol AS gene_b,
   gb.role AS gene_b_role,
   gb.driver AS gene_b_driver,
   ds.name AS evidence,
   r.score as rscore,
   d.name AS drug_name,
   r.fdr,
   r.pval,
   r.nes,
   ge.skewness,
   l.score as dscore,
   s.name as source

FROM 
    genes ga, 
    genes gb, 
    genetic_alterations a,
    relationships r,
    contexts c,
    lnk_genes_drugs l,
    datasets ds, 
    drugs d,
    gene_essentiality ge,
    sources s

WHERE true
    AND ga.id = a.id_genes
    AND a.id = r.id_genetic_alterations
    AND gb.id = r.id_genes_B
    AND a.id_contexts = c.id
    AND c.id = l.id_contexts
    AND gb.id = l.id_genes
    AND ds.id = r.id_datasets
    AND l.id_drugs = d.id
    AND ds.id = ge.id_datasets
    AND gb.id = ge.id_genes
    AND l.id_sources = s.id
    
    
    AND (
            (l.id_sources = 1 AND l.score >= 0.6)
        or  
            (l.id_sources = 2 AND l.score >= 0.95)
        )   
    
    ##FILTERS##
;
