--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: evidencetag; Type: TABLE; Schema: public; Owner: dikb; Tablespace: 
--

CREATE TABLE evidencetag (
    abbreviation character varying(400) NOT NULL,
    tag character varying(400) NOT NULL
);


ALTER TABLE evidencetag OWNER TO dikb;

--
-- Data for Name: evidencetag; Type: TABLE DATA; Schema: public; Owner: dikb
--

INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_PK_DDI_NR', 'A non-randomized DDI clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#Non_Tracable_Statement', 'Non_Tracable_Statement');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#Drug_Label', 'A drug-label statement');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Case_Report', 'An observation-based report');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Case_Report_ADE', 'An observation-based ADE report');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Case_Report_ADE_Public_Reported', 'An observation-based ADE report in a public reporting database');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Case_Report_DI_CR', 'A published observation-based ADE report');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Case_Report_DI_CR_Evaluated', 'A published and evaluated observation-based ADE report');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Clinical_Trial', 'A clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_CT_DDI', 'A DDI clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_CT_PK_DDI', 'A study designed to quantify the pharmacokinetic effects within study participants of a single drug in the presence of a purported precipitant.');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_PK_DDI_Par_Grps', 'A parallel groups DDI clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_CT_Pharmacokinetic', 'A pharmacokinetic clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_CT_PK_Genotype', 'A genotyped pharmacokinetic clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_CT_PK_Phenotype', 'A phenotyped pharmacokinetic clinical trial');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_ID', 'A drug metabolism identification experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_ID_CYP450', 'A CYP450 drug metabolism identification experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_ID_CYP450_Hum_Liver_Microsome', 'A CYP450, human microsome, drug metabolism identification experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_Inhibit', 'A metabolic enzyme inhibition experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_Inhibit_CYP450', 'A CYP450 metabolic enzyme inhibition experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Observational', 'An observational study');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_PK_DDI_Observational', 'An observational DDI study');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Population_PK', 'An observational population PK study');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Review', 'A review article');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Drug_Review', 'A drug review article');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_DrugClinicalReview', 'An FDA clinical review');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_Statement', 'A statement');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_Inhibit_CYP450_Human_Recom', 'A CYP450, recombinant, metabolic enzyme inhibition experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Trans_Prot_ID', 'A drug transporter protein identification experiment');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_EX_Met_Enz_ID_Cyp450_Hum_Recom', 'A CYP450, recombinant, drug metabolism identification experiment with possibly NO probe enzyme inhibitor(s)');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('', 'Other');
INSERT INTO evidencetag (abbreviation, tag) VALUES ('http://dbmi-icode-01.dbmi.pitt.edu/dikb-evidence/DIKB_evidence_ontology_v1.3.owl#EV_PK_DDI_RCT', 'A randomized DDI clinical trial');


--
-- PostgreSQL database dump complete
--

