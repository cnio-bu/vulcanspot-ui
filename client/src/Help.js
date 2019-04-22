/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from'@material-ui/core/Divider';

import img_main from './img/main.jpg';
import img_advanced from './img/advanced-options.png';
import img_results from './img/results_table.png';
import img_druggable from './img/druggable_gene.png';
import img_ranking from './img/ranking-summary-table.png';
import img_example from './img/example-1-erbb2-breast.png';
import img_drug from './img/drug-list.png';
import img_results2 from './img/results-full.png';
import img_example2 from './img/example-2-braf-skin.png';
import img_braf from './img/braf-results-full.png';


const baseUrl = 'http://vulcanspot.org/api'
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
});

class Help extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Typography component='p' variant='h4' style={{textAlign:'center'}}>
                        vulcanSpot Help 
                    </Typography>
                    <br/ >
                    <br/ >
                    <Paper style={{padding:10}} square={true}>
<ol>
<li><p><a href="#FAQs">FAQs</a></p></li>
<li><p><a href="#query-options">QUERY OPTIONS</a></p></li>
<li><p><a href="#advanced-filters">ADVANCED FILTERS</a></p></li>
<li><p><a href="#output-summary-table">OUTPUT SUMMARY TABLE</a></p></li>
<li><p><a href="#use-cases">USE CASES</a></p></li>
<li><p><a href="#api">API</a></p></li>
</ol>

<h2>1. FAQs<a id="FAQs"></a></h2>

<p><strong>1.1 What is <em>vulcanSpot</em>?</strong></p>

<p><center> <img width="500" height="889" src={img_main}/> </center></p>

<p><em>vulcanSpot</em> is a web tool that integrates genome-wide information provided by large-scale screening experiments to detect Genetic Vulnerabilities in Cancer.</p>

<p>The method proposes prioritized drugs to target these cancer-specific gene dependencies using a weighted scoring system based on well known drug-gene relationships and drug repositioning strategies.</p>

<p><strong>1.2. How do I cite VulscanSpot?</strong></p>

<p>When citing our application, please refer to our publication:
[PMID and link]</p>

<p><strong>1.3 Could I use <em>vulcanSpot</em> for commercial purposes?</strong></p>

<p><em>vulcanSpot</em> is intended for research purposes and academic use exclusively.
If you are interested in a collaboration, please, contact Dr. Fátima Al-Shahrour (falshahrour@cnio.es).</p>

<h2>2. Main Query Options<a name="query-options"></a></h2>

<p>In order to query the database and obtain a <strong>list of genetic alterations associated to therapeutic vulnerabilities</strong>, users must provide the HUGO Gene Symbols of a gene or genes with a matched dependency in the database. Input genes are defined as <strong>Gene(s) A</strong> and correspond to candidate genes with a genetic alteration.</p>

<p>Results can then be filtered, depending on the tissue of interest, selecting an option in the <strong>Contexts</strong> field. By default, all cancer types are selected.</p>

<h2>3. Advanced Filters<a name="advanced-filters"></a></h2>

<p>User queries can be adjusted using the panel of advanced options:</p>

<p><center> <img width="900" src={img_advanced}/> </center></p>

<ul>
<li><strong>Gene B</strong>: Allows you to easily filter your query using a candidate Gene B or a set of candidates of interest when available.</li>
<li><strong>Minimum GD score</strong>: Sets up a minimum Genetic Dependency (GD) score to retrieve selectively more lethal dependencies. Default is set to 0.00, our recommendation is to set this value to 0.20.</li>
<li><strong>Maximum FDR</strong>: The maximum False Discovery Rate setting allows us to avoid False Positives. Default value set to 0.25.</li>
<li><strong>GDs on cancer genes</strong>: Select this option in case you are interested in therapeutic vulnerabilites related to Cancer Genes only.</li>
</ul>

<h2>4. Output Summary Table<a name="output-summary-table"></a></h2>

<p><em>vulcanSpot</em> final output consists on a <strong>prioritized list of drugs targeting GDs</strong> detected in the user's gene list (FDR&lt;0.25). By default <em>vulcanSpot</em> shows the top-10 drug-GDs relationships together with gene and drug information and functional annotation. Users can expand the final output and download the full results table.</p>

<p><center> <img width="1160" height="500" src={img_results}/> </center></p>

<p>The output is divided in the main three sections described below:</p>

<ul>
<li><p><strong>GENE A (Genes harbouring a genetic alteration)</strong>: Genotype-Context alterations for which gene dependencies were found.</p>

<ul>
<li>Gene Symbol: gene which harbors a genetic alteration.</li>
<li>Gene Alteration: Type of Genetic Alteration. GoF corresponds to Gain-of-Function and LoF to Loss-of-Function alterations.</li>
<li>Context: Cancer lineage where the alteration takes place.</li>
<li>Druggable Gene: Informs of the druggability status for Gene A. If druggable, a list of available drugs for Gene A can be displayed by clicking on the pill.</li>
</ul>

<p><center> <img width="928" height="400" src={img_druggable}/> </center></p></li>
<li><p><strong>GENE B (Genes that feature genetic dependency on Gene A)</strong>: Potential molecular dependencies to be exploited therapeutically.</p>

<ul>
<li>Gene Symbol: Essential gene when Gene A is altered.</li>
<li>Role in Cancer: Gene B driver role.</li>
<li>Experimental platform (GD score): Platform where the dependency was detected. The differential color stands for the significance of the dependency in each of the available studies (CRISPR and RNAi). Green corresponds to a significant result, whereas grey corresponds to a not significant result in that particular study.</li>
<li>GD evidence (score): states the significance of the GD between the Gene A (gene with a genetic alteration) and the depletion of Gene B.</li>
<li>NES: Normalized Enrichment Score derived from the Kolmogorov–Smirnov test. This procedure tests whether there is a significant enrichment of the genotype-context specific cell line with the essentiality of a given gene. The statistical analysis detects GDs for both lineage-specific or PanCancer scenarios.</li>
<li>P-value: P-value derived from the Kolmogorov-Smirnov test.</li>
<li>FDR: False discovery rate, P-values are corrected using the Benjamini–Hochberg procedure.</li>
</ul></li>
<li><p><strong>DRUG (In silico drug prescription for genetic dependencies)</strong>: Computed drug prescriptions amongst the identified dependencies.</p>

<ul>
<li>Drug: Pharmacological common name.</li>
<li>PanDrugs score: <em>vulcanSpot</em> estimates the drug response and treatment suitability using the Drug Score (DScore) calculated by PanDrugs (2018.04.30) for the Gene B - Drug interaction. The score ranges between 0 an 1, where the higher the score, the better is the drug-gene association. For more information about how this score was obtained, check PanDrugs help section: https://www.pandrugs.org/#!/help.</li>
<li>LINCS+PPi Score: also known as KDCP score. Measures the similarity between each pair of gene expression signatures derived from gene knock-down (KD) experiments and compound experiments (CP) from the CMap-L1000 project, corrected by the distance between the drug and its target. The score ranges between 0 an 1, where the higher the score, the better is the association.</li>
<li>Best Result: highlights Gene B - Drug interactions surpassing both PanDrugs and LINCS scores thresholds. PanDrugs > 0.7 and LINCS > 0.9.</li>
<li>Validated: States whether the suggested drug response was experimentally validated  using cell lines drug sensitivity data (IC50) from CTRP and/or GDSC</li>
</ul></li>
</ul>

<p><em>vulcanSpot</em>'s final ranking of prioritized drugs is ordered <em>decreasingly</em> according to the following rationale:
<center> <img height="500" src={img_ranking}/> </center></p>

<ol>
<li>Both gene A and gene B are druggable and meet DScore ≥ 0.6 and KDCP score ≥ 0.9.</li>
<li>Gene B is druggable meeting both DScore ≥ 0.6 and KDCP score ≥ 0.9. Gene A is undruggable.</li>
<li>Gene B is druggable meeting either DScore ≥ 0.6 or KDCP score ≥ 0.9. Gene A is undruggable.</li>
<li>Both gene A and gene B are undruggable.</li>
</ol>

<h2>5. Use cases<a name="use-cases"></a></h2>

<p><strong>1. ERBB2 in Breast cancer</strong></p>

<p>In this example we are interested in a therapeutic strategy targeting the overexpression of Human epidermal growth factor receptor 2 (HER2) in Breast Cancer cases (<strong>Context</strong> = BREAST). This receptor tyrosine kinase is encoded by the gene ERBB2 and appears as overexpressed in approximately 15% of human breast cancers (Slamon et al., 1987), usually due to its amplification, functioning as an oncogene and promoting tumorgenesis, proliferation, invasion or metastasis.</p>

<p><center> <img height="327" src={img_example} width="1500"/> </center></p>

<p>Upon introducing the gene of interest in the <strong>genes A</strong> section, results will automatically be generated. To better understand the results table, see the <a href="#/help#output-summary-table">OUTPUT SUMMARY TABLE</a> section.</p>

<p>By clicking at the drug symbol, a list of all available drugs for ERBB2, as well as their PanDrugs score  will be shown.</p>

<p><center> <img width="1500" src={img_drug}/> </center></p>

<p><em>vulcanSpot</em>, based on its PanDrugs score, suggests the use of Trastuzumab, which is currently an approved line of treatment in HER2-positive Breast cancer patients (Moasser and Krop, 2015). But the <em>vulcanSpot</em> tool offers some other candidates such as Palbociclib and Tamoxifen based on more layers of evidence (for Palbociclib: PanDrugs = 1, LINCS+PPi Score = 0.995, DepMap RNAi = 2.72e-1; in the case of Tamoxifen: PanDrugs = 1, LINCS+PPi Score = 0.991, DepMap RNAi = 2.72e-1). Palbociclib and Tamoxifen inhibit CDK4 and ESR1 respectively and both of them are implicated in the regulation of the cell’s proliferation. In particular, CDK4 inhibitors have been previously described as a way of overcoming therapeutic resistance in HER2-positive patients (Goel et al, 2016), suggesting they would be good candidates to test.</p>

<p><center> <img width="1500" src={img_results2}/> </center></p>

<p><strong>2. BRAF in Melanoma</strong></p>

<p>Here, we are interested in melanoma cases that harbor a BRAF <em>Gain of function</em>, a mutation driving metastatic melanoma in approximately 50% of patients, that causes the activation of pathways involved in proliferation, differentiation, survival, stress response or apoptosis (Davies et al., 2002). For this purpose, we should select <em>BRAF</em> as <strong>gene A</strong> and <em>SKIN</em> as <strong>Context</strong>.</p>

<p><center> <img height="405" width="1500" style={{width:1500}} src={img_example2}/> </center></p>

<p>Again, check the <a href="#/help#output-summary-table">OUTPUT SUMMARY TABLE</a> section for a explanation on the components of the results table.</p>

<p><center> <img width="1500"  src={img_braf}/> </center></p>

<p>Specific BRAF inhibitors are shown amongst the top 10 results, including dabrafenib and vermurafenib, which show a LINCS+PPi score of 1, as well as evidences in both DepMap's CRISPR and RNAi screenings.
But those results are not the only interesting ones, it's been shown that BRAFV600-mutated melanoma cells are dependent on RAF/MEK/ERK signalling (Ribas and Flaherty, 2011). Furthermore, it's also been shown that the Mitogen-activated protein kinase (MAPK) inhibitors sensitize BRAF Mutant Melanoma and result in a significant delay in the appearance of resistances (Flaherty et al, 2012; Long et al, 2014; Larkin et al, 2014). <em>vulcanSpot</em> offers selumetinib, as-703026 or pd-0325901 pd-184352 as possible candidates to test.</p>
<h2><a id="api"></a>6. API reference</h2>
                        <Typography component='p' variant='body1'>
                            vulcanSpot offers programmatic access to its data through a RESTful API.
                            This is a list of available REST endpoints:
                        </Typography>
                        <br/>

                        <Divider className={classes.divider}/>
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes 
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists all genes in vulcanSpot
                        </Typography>
                        <Divider className={classes.divider}/>
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes?class=A
                            <br />
                            {baseUrl}/genes?class=B
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists all genes for a certain class
                        </Typography>

                        <Divider className={classes.divider} />
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes/{'{gene symbol}'} 
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists details for a gene in vulcanSpot
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes/{'{gene symbol}'}/treatments
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists available gene dependencies and treatments for a gene in vulcanSpot
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography component='p' variant='h6'>
                            {baseUrl}/contexts 
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists all cancer contexts in vulcanSpot
                        </Typography>

                    </Paper>
    <br/>
    <br/>
    <br/>
    <br/>
            </main>
            /* jshint ignore:end*/
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);
