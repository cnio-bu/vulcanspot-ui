
SELECT
   ga.symbol AS gene_a,
   a.alteration as gene_a_alteration,
   c.name AS context,
   
   gb.symbol AS gene_b,
   ga.druggable AS druggable_a,
   gb.druggable AS druggable_b,
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
    relationships r
        INNER JOIN genetic_alterations a
            ON a.id = r.id_genetic_alterations
        INNER JOIN genes ga
            ON ga.id = a.id_genes
        INNER JOIN genes gb
            ON gb.id = r.id_genes_B
        INNER JOIN datasets ds
            ON ds.id = r.id_datasets
        INNER JOIN contexts c
            ON c.id = a.id_contexts
        INNER JOIN gene_essentiality ge
            ON ge.id_genes = gb.id AND ds.id = ge.id_datasets
        LEFT JOIN lnk_genes_drugs l
            ON l.id_genes = gb.id AND c.id = l.id_contexts
            AND (
                (l.id_sources = 1 AND l.score >= 0.6)
            or
                (l.id_sources = 2 AND l.score >= 0.9)
            )
        LEFT JOIN drugs d
            ON d.id = l.id_drugs
        LEFT JOIN sources s
            ON s.id = l.id_sources

WHERE true
    ##FILTERS##
;
