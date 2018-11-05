import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import options from './img/advanced-options.png';
import table from './img/ranking-summary-table.png';
import main from './img/main.png';
import Divider from'@material-ui/core/Divider';


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
<li><a href="#FAQs">FAQs</a></li>
<li>
<p><a href="#query-options">Query Options</a></p>
</li>
<li>
<p><a href="#advanced-filters">Advanced Filters</a></p>
</li>
<li>
<p><a href="#output-summary-table">Output Summary Table</a></p>
</li>
<li>
<p><a href="#api">API reference</a></p>
</li>
</ol>
<h2><a id="1_FAQs_16"></a>1. FAQs</h2>
<p><strong>1.1 What is vulcanSpot?</strong></p>
<p>vulcanSpot is a web tool that integrates genome-wide information provided by large-scale screening experiments to detect Genetic Vulnerabilities in Cancer.</p>
<p>The method proposes prioritized drugs to target these cancer-specific gene dependencies using a weighted scoring system based on well known drug-gene relationships and drug repositioning strategies.</p>
<center> <img width="500" height="889" src={main} alt="" /> </center>
<p><strong>1.2 May I use vulcanSpot for commercial purposes?</strong></p>
<p>vulcanSpot is intended for research purposes and academic use exclusively.<br/>
If you are interested in a collaboration, please contact Dr. Fátima Al-Shahrour (<a href="mailto:falshahrour@cnio.es">falshahrour@cnio.es</a>).</p>
<h2><a id="2_Main_Query_Optionsa_namequeryoptionsa_35"></a>2. Main Query Options<a name="query-options"></a></h2>
<p>In order to query the database and obtain a <strong>list of genetic alterations associated to therapeutic vulnerabilities</strong>, users must provide the HUGO Gene Symbols of a gene or genes with a matched dependency in the database. Input genes are defined as <strong>Gene(s) A</strong> and correspond to candidate genes with a genetic alteration.</p>
<p>Results can then be filtered, depending on the tissue of interest, selecting an option in the <strong>Contexts</strong> field. By default, all cancer types are selected.</p>
<h2><a id="3_Advanced_Optionsa_nameadvancedfiltersa_40"></a>3. Advanced Options<a name="advanced-filters"></a></h2>
<p>User queries can be adjusted using the panel of advanced options:<br/><center> <img alt="" style={{height:200}} src={options} /></center></p>
<ul>
<li><strong>Gene B</strong>: Allows you to easily filter your query using a candidate Gene B or a set of candidates of interest when available.</li>
<li><strong>Minimum GD score</strong>: Sets up a minimum Genetic Dependency (GD) score to retrieve selectively more lethal dependencies. Default is set to 0.00, our recommendation is to set this value to 0.20.</li>
<li><strong>Maximum FDR</strong>: The maximum False Discovery Rate setting allows us to avoid False Positives. Default value set to 0.25.</li>
<li><strong>GDs on cancer genes</strong>: Select this option in case you are interested in therapeutic vulnerabilites related to Cancer Genes only.</li>
</ul>
<h2><a id="4_Output_Summary_Tablea_nameoutputsummarytablea_51"></a>4. Output Summary Table<a name="output-summary-table"></a></h2>
<p>

vulcanSpot's main output consists on a <strong>prioritized list of drugs targeting GDs</strong> detected in the user's gene list (FDR&lt;0.25). By default vulcanSpot shows the top-10 drug-GDs relationships together with gene and drug information and functional annotation. Users can expand the final output and download the full results table.

</p>
<p>The output is divided in the main three sections described below:</p>
<ul>
<li><strong>Genetic alteration</strong>: Genotype-Context alterations for which gene dependencies were found.
<ul>
<li>Gene A: gene which harbors a genetic alteration.</li>
<li>Alteration: Type of Genetic Alteration. GoF corresponds to Gain-of-Function and LoF to Loss-of-Function alterations.</li>
<li>Context: Cancer lineage where the alteration takes place.</li>
</ul>
</li>
</ul>
<ul>
<li><strong>Cancer genetic dependency</strong>: Potential molecular dependencies to be exploited therapeutically.
<ul>
<li>Gene B: Essential gene when Gene A is altered.</li>
<li>Gene B role (driver): Role in Cancer.</li>
<li>Evidence: Platform where the dependency was detected. The differential color stands for the significance of the dependency in each of the available studies (CRISPR and RNAi). Green corresponds to a significant result, whereas grey corresponds to a not significant result in that particular study.</li>
<li>Score:
<ul>
<li>GD score: states the significance of the GD between the Gene A (gene with a genetic alteration) and the depletion of Gene B.</li>
<li>NES: Normalized Enrichment Score derived from the Kolmogorov–Smirnov test. This procedure tests whether there is a significant enrichment of the genotype-context specific cell line with the essentiality of a given gene. The statistical analysis detects GDs for both lineage-specific or PanCancer scenarios.</li>
<li>P-value: P-value derived from the Kolmogorov-Smirnov test.</li>
<li>FDR: False discovery rate, P-values are corrected using the Benjamini–Hochberg procedure.</li>
</ul>
</li>
</ul>
</li>
</ul>
<ul>
<li><strong>Therapies</strong>: Computed drug prescriptions amongst the identified dependencies.
<ul>
<li>Drug: Pharmacological common name.</li>
<li>Drug score: vulcanSpot estimates the drug response and treatment suitability using the Drug Score (DScore) calculated by PanDrugs (2018.04.30) for the Gene B - Drug interaction. The score ranges between 0 an 1, where the higher the score, the better is the drug-gene association. For more information about how this score was obtained, check PanDrugs help section: <a href="https://www.pandrugs.org/#!/help">https://www.pandrugs.org/#!/help</a>.</li>
<li>LINCS score: also known as KDCP score. Measures the similarity between each pair of gene expression signatures derived from gene knock-down (KD) experiments and compound experiments (CP) from the CMap-L1000 project, corrected by the distance between the drug and its target. The score ranges between 0 an 1, where the higher the score, the better is the association.</li>
</ul>
</li>
</ul>
<p>
vulcanSpot's final ranking of prioritized drugs is ordered *decreasingly* according to the following rationale:
        
        <br/>
<center><img alt="" width="500" height="583" src={table} /></center></p>
<ol>
<li>Both gene A and gene B are druggable and meet DScore ≥ 0.6 and KDCP score ≥ 0.9.</li>
<li>Gene B is druggable meeting both DScore ≥ 0.6 and KDCP score ≥ 0.9. Gene A is undruggable.</li>
<li>Gene B is druggable meeting either DScore ≥ 0.6 or KDCP score ≥ 0.9. Gene A is undruggable.</li>
<li>Both gene A and gene B are undruggable.</li>
</ol>
<h2><a id="api"></a>5. API reference</h2>
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
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);
