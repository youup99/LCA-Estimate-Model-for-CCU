# Overview

**What is LCA Estimate Model for CCU?**

- The LCA Estimate Model for CCU is an Excel-based model that estimates the GHG emissions associated with carbon capture and utilization pathways. Five different pathways are displayed as examples.

## How to Use

1. In the 'General Assumptions' section on the home page, select the Electricity, Heat, Steam, Hydrogen, and Carbon Dioxide sources from the dropdown menus.
    - You can choose to customize the emission factor by filling in the fields under the "Custom emission factors".
    - To reset to default values, click on the "Reset" button on the top right.
2. The respective LCA results will be displayed in the figures on the right.
3. If desired, parameters may be changed for **individual pathways**:
    - In the sub-section of each pathway, input the desired values in the text boxes.
    - To reset to default values, click on the "Reset Pathway" button on the top right.

## Brief description of pages

### Main/Home page

- General and Pathway specific assumptions/parameters may be changed.
- Figure 1 and 2 are displayed on the right half of the page.
- Figure 3 and 4 are displayed on the bottom spanning across the entire page.

### Calculation page

- The first table shows the selections from the 'General Assumptions' section on the main page.
- There is a tab for each pathway with additional tabs for each sub-pathway and one tab for the summary.

### Summary page

- The summary table for each pathway conveys the results that are shown in the 4 figures on the main page.

## Framework and Model

How to classify and use pathways:
1. Each technology is classified as per the first CO2 reaction of the pathway according to the following categorization scheme:

| Category Names        | Category Definition           | Example Processes  | Example End
|:---------------------:|:-----------------------------:|:------------------:|:------------:|
| CO2 Mineralization    | CO2 is not reduced but instead is reacted with a cation such as magnesium, calcium, or iron to form a carbonate mineral. <br><br>This category only includes ex-situ conversion. In-situ mineralization is considered a CO2 sequestration method, not a utilization method.                                     | Reaction of CO2 with magnesium silicate (found in olivine) to form magnesium carbonate and silica:<br><br><br>Mg2SiO4 + 2CO2  →  2MgCO3 + SiO2                                                            | Carbonate, concrete and soil additives                                                                 |
| CO2 Bio-Conversion    | Microbial: CO2 is first converted by unicellular biological organisms that derive their energy from light (e.g. by photosynthesis) or use chemical energy (i.e. chemotrophs). <br><br> Plant-Based: CO2 is captured and converted by photosynthetic plants into biomass.                                    | Photosynthesis <br><br><br><br>Fermentation<br><br><br>Biomass production by trees, grasses, crops, and macroscopic algae (e.g. kelp)                                                | Malate, ethanol, biodiesel, renewable diesel, other biofuels, proteins, biomass, syngas, hydrocarbon fuels, methanol, other chemical feedstocks                                                  |
| CO2 Reduction by Other Reagents | CO2 is first reduced by a chemical reaction with a reagent other than hydrogen or a hydrocarbon. <br><br><br> Includes some 'CO2 polymerization' and ethylene synthesis pathways<br>Does not include bio-conversions or those involving electricity or light                                    | Reduction of CO2 by methanol, glycerol, or epoxide                                                         | Ethylene oxide, dimethyl carbonate (DMC), polycarbonate plastics                                     |
| CO2 Reduction Involving Electricity | CO2 is first reduced by a reaction involving externally-applied electricity but not light. <br><br>Other forms of energy, like heat or chemical energy, may also be involved. These other energy forms may even predominate.                                            | Low-Temperature/Aqueous CO2 Electrolysis<br><br>High-Temperature SOEC Electrolysis<br><br><br><br>Reversible Fuel Cell processes                                                                    | Syngas, hydrocarbon fuels, methanol, petrochemical feedstocks, formate                              |
| CO2 Reduction by Hydrocarbon | CO2 is first reduced by a chemical reaction with a hydrocarbon<br><br>A hydrocarbon'  is a substance containing only hydrogen and carbon atoms<br><br>Examples include methane and ethane but not methanol, glycerol or coke                                                    | Dry Methane Reforming<br><br><br>Bi-Reforming<br><br><br>Tri-Reforming                   | Syngas (CO + H2), hydrocarbon fuels, methanol, butanol, and other chemical feedstocks                    |
| CO2 Reduction by Hydrogen | CO2 is first reduced by a chemical reaction with hydrogen<br><br>These reactions typically use a catalyst| Reverse Water-Gas Shift (RWGS)<br><br><br><br>Methanol Synthesis from CO2 and H2 CO2 Methanation           | Syngas, hydrocarbon fuels, methanol, dimethyl ether (DME), synthetic natural gas (SNG)              |
| CO2 Reduction Involving Light | CO2 is first reduced by a reaction that involves light energy<br><br><br>Other forms of energy may also be involved or even predominate. e.g. heat, chemical or electrical energy<br><br>Does not include biological photosynthesis                                          | Photocatalysis<br><br><br><br>Photoelectrocatalysis                          | Syngas, hydrocarbons, methanol, hydrogen, other chemical feedstocks                                 |
| Other CO2 Conversions | All other methods of CO2 utilization. Includes CO2 absorption and thermal splitting / plasma processes.                   | Thermal Splitting of CO2, as with the iron oxide redox cycle                                                   | Syngas, hydrocarbon fuels, other chemical feedstocks                                                |

2. Use the following framework to determine stage emissions for respective processes in the life cycle of the CCU technologies.
![Image of Framework](/framework.png)

## Cautions when interpreting results
1. In Figure 2, the comparison of pathways per kg of Product can only be done for one product at a time since 1 kg of diesel has a different meaning (or function) than 1 kg of methane from a LCA perspective.
2. In Figure 2, the incumbent technology is a point estimate of a conventional production method. The emission factors selected in the General Assumptions are applied to the incumbent technologies to maintain consistency. Importantly, even though it is possible to change the intensities of inputs for incumbent fuels, the incumbent technology estimate does the cover the full range of possible technologies that CCU pathways will compete against in the future. Competitors were not considered. This will be expanded in the future.
3. The avoided emissions in Figure 3 is the difference between the CCU and the incumbent technology. However, time frame mismatch was not considered and needs to be interpreted with caution, since the incumbent technology is a established technology (currently) and the CCU alternative is considered to be deployed in the future.
4. The global reduction potential in Figure 4 is a high level estimate considering the market size as of 2015 and a market penetration of 50%. More sophisticated models were not applied. This will be expanded in future work.
5. In Figure 4, Global Reduction Potential, if the CCU pathways do not result in reduced emissions, it will be presented as 0.
6. The end use phase is considered as the full combustion for fuels. Transportation and distribution of end-products are not included.

## References

The following publications are used as reference to emission factors, life cycle inventory for pathways and incumbent technologies, and constants used throughout the model.

Fu, Q., Mabilat, C., Zahid, M., Brisse, A., Gautiner, L. 2009. Syngas production via high-temperature steam/CO2 co-electrolysis: an economic assessment. Energy & Environmental Science. DOI: 10.1039/c0ee00092b										
										
										
Giannoulakis, S., Volkart, K., Bauer, C. 2014. Life cycle and cost assessment of mineral carbonation for carbon capture and storage in European power generation. International Journal of Greenhouse Gas Control. DOI: 10.1016/j.ijggc.2013.12.002.										
										
										
Hoppe, W., Thonemann, N., Bringezu, S. 2017. Life Cycle Assessment of Carbon Dioxide–Based Production of Methane and Methanol and Derived Polymers. Journal of Industrial Ecology. DOI: 10.1111/jiec.12583										
										
										
ICEF, "Global Roadmap for Implementing CO2 Utilization. CO2 Sciences and The Global CO2 Initiative. Innovation for Cool Earth Forum," 2016.										
										
IEA, Tracking the decoupling of electricity demand and associated CO2 emissions. Avilable at: <https://www.iea.org/commentaries/tracking-the-decoupling-of-electricity-demand-and-associated-co2-emissions>. 2019.										
										
										
Jean, M.D.S., Baurens, P., Bouallou, C. 2014. Parametric study of an efficient renewable power-to-substitute-natural-gas process including high-temperature steam electrolysis. International Journal of Hydrogen Energy. DOI: 10.1016/j.ijhydene.2014.08.091										
										
										
Kiss, A.A., Pragt, J.J., Vos, H.J., Bargeman, G., de Groot, M.T. 2016. Novel efficient process for methanol synthesis by CO2 hydrogenation. Chemical Engineering Journal. DOI: 10.1016/j.cej.2015.08.101										
										
										
Kurad, R., Silvestre, J. D., Brito, J., Ahmed, H. 2017. “Effect of incorporation of high volume of recycled concrete aggregates and fly ash on the strength and global warming potential of concrete”, Journal of Cleaner Production, vol. 166, pp. 485-502.										
										
										
Lardon, L., Hélias, A., Sialve, B., Steyer, J.P., Bernard, O. 2009. Life-Cycle Assessment of Biodiesel Production from Microalgae.  Environmental Science & Technology. DOI: 10.1021/es900705j.										
										
										
Li-na, J. 2013. Study on Preparation Process and Properties of Polyethylene Terephthalate (PET). Applied Mechanics and Materials. DOI: 10.4028/www.scientific.net/AMM.312.406										
										
										
Liu, X., Saydah, B., Eranki, P., Colosi, L.M., Greg, M.B., Rhodes, J., Clarens, A.F. 2013. Pilot-scale data provide enhanced estimates of the life cycle energy and emissions profile of algae biofuels produced via hydrothermal liquefaction. Bioresource Technology. DOI: 10.1016/j.biortech.2013.08.112										
										
										
										
Luu, M. Milani, D., Bahadori, A., Abbas, A. 2015. A comparative study of CO2 utilization in methanol synthesis with various syngas production technologies. Journal of CO2 Utilization. DOI: 10.1016/j.jcou.2015.07.001. 										
										
										
Manganaro, J.L., Lawal, A. 2016. CO2 Life-Cycle Assessment of the Production of Algae-Based Liquid Fuel Compared to Crude Oil to Diesel. Energy & Fuels. DOI: 10.1021/acs.energyfuels.6b00207										
										
										
Matzen, M., Alhajji, M., Demirel, Y. 2015. Chemical storage of wind energy by renewable methanol production: Feasibility analysis using a multi-criteria decision matrix. Energy. DOI: 10.1016/j.energy.2015.09.043										
										
										
Müller, B., Müller, K., Teichmann, D., Arlt, W. 2011. Energiespeicherung mittels Methan und energietragenden Stoffen – ein thermodynamischer Vergleich Energy Storage by CO2 Methanization and Energy Carrying Compounds: A Thermodynamic Comparison. Chemie-Ingenieur-Technik. DOI: 10.1002/cite.201100113.										
										
										
										
Pan, S.-Y., Lafuente, A.M.L., and Chiang, P.-C. 2016. Engineering, environmental and economic performance evaluation of high-gravity carbonation process for carbon capture and utilization. Applied Energy, vol. 170, p. 269–277.										
										
										
Perez-Fortes, M., Schöneberger, J.C., Boulamanti, A., Tzimas, A. 2016. Methanol synthesis using captured CO2 as raw material: Techno-economic and environmental assessment. Applied Energy. DOI: 10.1016/j.apenergy.2015.07.067										
										
										
Ponnusamy, S., Reddy, H.K., Muppaneni, T., Downes, C.M., Deng, S. 2014. Life cycle assessment of biodiesel production from algal bio-crude oils extracted under subcritical water conditions. Bioresource Technology. DOI: 10.1016/j.biortech.2014.07.072										
										
										
Reiter, G., Lindorfer, J. 2015. Global warming potential of hydrogen and methane production from renewable electricity via power-to-gas technology. The International Journal of Life Cycle Assessment. DOI: 10.1007/s11367-015-0848-0										
										
										
Rihko-Struckmann, L.K., Peschel, A., Hanke-Rauschenbach, R., Sundmacher, K. 2010. Assessment of Methanol Synthesis Utilizing Exhaust CO2 for Chemical Storage of Electrical Energy. Industrial & Engineering Chemistry Research. DOI: 10.1021/ie100508w										
										
										
Spurgeon, J.M., Kumar, B. 2018. A comparative technoeconomic analysis of pathways for commercial electrochemical CO2 reduction to liquid products. Energy & Environmental Science. DOI: 10.1039/c8ee00097b.										
										
										
Torres, Cm.M., Rios, S.D., Torras, C., Salvadó, J., Mateo-Sanz, J.M., Jiménez, L. 2013. Microalgae-based biodiesel: a multicriteria analysis of the production process using realistic scenarios. Bioresource Technology.  DOI: 10.1016/j.biortech.2013.07.145.										
										
										
Trudewind, C.A., Schreiber, A., Haumann, D. 2014a. Photocatalytic methanol and methane production using captured CO2 from coal-fired power plants. Part I - a Life Cycle Assessment. Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2014.02.014										
										
										
Trudewind, C.A., Schreiber, A., Haumann, D. 2014b. hotocatalytic methanol and methane production using captured CO2 from coal power plants. Part II – Well-to-Wheel analysis on fuels for passenger transportation services. Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2014.02.024										
										
										
										
RFA, Renewable Fuels Association. Annual World Fuel Ethanol Production. Available at: <https://ethanolrfa.org/statistics/annual-ethanol-production/>. Accessed on Jan/25/2020.										
										
										
van der Giesen, C., Kleijn, R., Kramer, G. J. 2014. Energy and Climate Impacts of Producing Synthetic Hydrocarbon Fuels from CO2. Environmental Science & Technology. DOI:10.1021/es500191g										
										
## Terms of Use

This is a beta version of the LCA Estimate Model for CCU tool. It is not intended to provide definitive LCA results, instead it provides illustrative examples of CCU pathways. 

You accept that the Software is offered to you on an “as is” basis, and neither Dr. Bergerson or the University is making any warranties of any kind regarding its performance, including merchantability, fitness for any purpose or non-infringement.

You understand that you are using this software entirely at your own risk. You agree that neither Dr. Bergerson or the University will be liable for any direct, indirect, special, incidental or consequential damages resulting from your use, misuse or inability to use this software, even if Dr. Bergerson or the University has been advised of the possibility of such damages.