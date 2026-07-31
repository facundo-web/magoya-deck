/**
 * Content for the 5 exploration panels ("Proof Hub" nodes).
 * Edit this file to change what shows up when someone clicks a node —
 * no need to touch js/deck.js or index.html.
 */
window.MAGOYA_PANELS = {
      domains: {
        eyebrow: 'Exploration · 22 problem domains',
        title: 'Agricultural expertise is accumulated one problem at a time.',
        supporting: 'From soil microbiome interpretation to carbon modeling. From field trials to explainable agronomic recommendations. From grower decision support to enterprise agricultural platforms.',
        bulletsLabel: 'Capabilities',
        items: [
          { name:'Soil Science', def:'Reading the soil beneath every decision.', bullets:['Microbiome interpretation','Soil sampling','Nutrient mapping','Carbon baselines'] },
          { name:'Nutrient Management', def:'Right nutrient, right place, right rate.', bullets:['Fertility planning','Variable-rate prescriptions','Tissue analysis','Nutrient ROI'] },
          { name:'Seed Selection', def:'Matching genetics to the field.', bullets:['Hybrid selection','Trait positioning','Placement models','Performance history'] },
          { name:'Planting Decisions', def:'Getting the crop into the ground right.', bullets:['Population modeling','Planting windows','Depth & spacing','Risk forecasting'] },
          { name:'Crop Protection', def:'Protecting yield potential.', bullets:['Product recommendations','Application planning','Weed management','Disease control'] },
          { name:'Pest Monitoring', def:'Seeing pressure before it spreads.', bullets:['Scouting workflows','Threshold alerts','Trap data','Outbreak modeling'] },
          { name:'Crop Monitoring', def:'Tracking the crop through the season.', bullets:['Imagery analysis','Growth staging','Anomaly detection','Stress indices'] },
          { name:'Yield Analytics', def:'Turning harvest into insight.', bullets:['Yield mapping','Benchmarking','Loss analysis','Forecast models'] },
          { name:'Field Trials', def:'Proving what works on real acres.', bullets:['Trial design','Protocol management','Statistical analysis','Result reporting'] },
          { name:'Sustainability', def:'Measuring practices that last.', bullets:['Practice tracking','Emissions modeling','Program reporting','Outcome verification'] },
          { name:'Traceability', def:'Following product from field to shelf.', bullets:['Lot tracking','Chain-of-custody','Compliance records','Provenance data'] },
          { name:'Biologicals', def:'Bringing living products to market.', bullets:['Efficacy modeling','Trial support','Positioning','Adoption tracking'] },
          { name:'Post-Harvest', def:'Protecting value after the field.', bullets:['Storage monitoring','Quality grading','Loss prevention','Logistics data'] },
          { name:'Geospatial', def:'Everything happens somewhere.', bullets:['Boundary management','Imagery pipelines','Spatial analytics','Map services'] },
          { name:'Data Integration', def:'Connecting fragmented agricultural systems.', bullets:['OEM integrations','Data pipelines','ETL processes','Interoperability'] },
          { name:'Explainability', def:'Recommendations you can defend.', bullets:['Model transparency','Reason codes','Agronomic logic','Trust scoring'] },
          { name:'Advisory Enablement', def:'Making advisors faster and sharper.', bullets:['Recommendation tools','Decision support','Field workflows','Knowledge capture'] },
          { name:'Commercial Enablement', def:'Turning agronomy into commercial wins.', bullets:['Sales tooling','Lead targeting','Product positioning','Channel support'] },
          { name:'Platform Modernization', def:'Bringing legacy ag systems forward.', bullets:['Re-architecture','Cloud migration','API layers','Performance'] },
          { name:'Farm Management Systems', def:'The operational backbone of the farm.', bullets:['Operations planning','Records management','Work orders','Inventory'] },
          { name:'Carbon & Environmental', def:'Quantifying the environmental outcome.', bullets:['Carbon modeling','MRV workflows','Program enrollment','Outcome reporting'] },
          { name:'Ag Logistics', def:'Moving agricultural product efficiently.', bullets:['Freight coordination','Route planning','Load tracking','Delivery visibility'] }
        ]
      },
      personas: {
        eyebrow: 'Exploration · 8 user personas',
        title: 'Agricultural software succeeds when it works for the people using it.',
        supporting: 'The same agricultural problem often requires completely different experiences for different users. Designing for all of them creates better products and stronger adoption.',
        bulletsLabel: 'Needs',
        items: [
          { name:'Growers', def:'Run the operation, own the outcome.', bullets:['Simplicity','Operational efficiency','Confidence','Outcomes'] },
          { name:'Agronomists', def:'Translate data into field decisions.', bullets:['Speed','Trust','Recommendations','Field usability'] },
          { name:'Sales Representatives', def:'Connect products to grower needs.', bullets:['Targeting','Product knowledge','Mobility','Follow-up'] },
          { name:'Dealers', def:'Move product and serve accounts.', bullets:['Inventory visibility','Ordering','Account management','Margins'] },
          { name:'Internal Teams', def:'Build, support, and scale the product.', bullets:['Clean data','Tooling','Observability','Velocity'] },
          { name:'Compliance Operators', def:'Keep the operation inside the lines.', bullets:['Traceability','Audit trails','Reporting','Accuracy'] },
          { name:'Finance & Insurance', def:'Price and protect agricultural risk.', bullets:['Data confidence','Risk models','Documentation','Transparency'] },
          { name:'Research Managers', def:'Turn questions into validated answers.', bullets:['Trial rigor','Data quality','Analysis','Reproducibility'] }
        ]
      },
      stages: {
        eyebrow: 'Exploration · 8 product development stages',
        title: 'Building software is only half the journey.',
        supporting: 'This is the map of a digital product\u2019s life in agribusiness: eight stages, from the first research to a loyal user base. Your problem lives somewhere on this map \u2014 you enter through one stage, almost never all eight.',
        bulletsLabel: 'Activities',
        items: [
          { name:'Research', group:'Build Arc', def:'Understand the problem before building the solution.', bullets:['Interviews','Market analysis','Journey mapping','Problem validation'] },
          { name:'Ideation', group:'Build Arc', def:'Decide what to build and why.', bullets:['Concept generation','Solution mapping','Prioritization','Product definition'] },
          { name:'Design', group:'Build Arc', def:'Shape how the product looks and works.', bullets:['UX flows','Prototypes','Testing','Design systems'] },
          { name:'Development', group:'Build Arc', def:'Build it and ship it.', bullets:['Architecture','Engineering','Integrations','QA'] },
          { name:'Evolution', group:'Build Arc', def:'Keep the product growing.', bullets:['New features','Scaling','Performance','Maintenance'] },
          { name:'Onboarding', group:'Adoption Arc', def:'Get users activated.', bullets:['Setup','Training','Enablement','Activation'] },
          { name:'Adoption', group:'Adoption Arc', def:'Turn usage into value.', bullets:['Engagement','Value realization','Behavior change','Product usage'] },
          { name:'Loyalty', group:'Adoption Arc', def:'Turn value into habit.', bullets:['Retention','Advocacy','Expansion','Long-term engagement'] }
        ]
      },
      countries: {
        eyebrow: 'Exploration · 10 countries',
        title: 'Agriculture changes by geography. Product expertise travels.',
        supporting: 'Different regulations. Different production systems. Different go-to-market models. Experience gained in one geography accelerates success in the next.',
        bulletsLabel: 'Characteristics',
        items: [
          { name:'United States', def:'Predominantly acres. Large-scale operations.', bullets:['OEM-driven ecosystems','Integrated machine data','Grower productivity focus','Operational efficiency'] },
          { name:'Canada', def:'Predominantly acres. Large-scale grain production.', bullets:['Retailer & advisor influence','Climate variability','Planning complexity','Adoption tied to ROI'] },
          { name:'Mexico', def:'Mixed production systems. Diverse crop portfolios.', bullets:['Regional agronomic variability','Channel relationships','Distribution-led','Operational diversity'] },
          { name:'Brazil', def:'Predominantly hectares. Tropical production systems.', bullets:['Large distributor networks','Regional complexity at scale','Fast innovation adoption','High intensity'] },
          { name:'Argentina', def:'Predominantly hectares. Retail-centric advisory.', bullets:['High agronomic intensity','Rapid tech adoption','Productivity focus','Decision support'] },
          { name:'Uruguay', def:'Predominantly hectares. Crop & livestock systems.', bullets:['Integrated systems','Sophisticated operators','Smaller market','Efficiency & simplicity'] },
          { name:'Paraguay', def:'Predominantly hectares. Rapid expansion.', bullets:['Operational scalability','Diverse environments','High performance needs','Growth-driven'] },
          { name:'Spain', def:'Highly regulated agricultural environment.', bullets:['Sustainability requirements','Specialized systems','Traceability-driven','Compliance focus'] },
          { name:'Morocco', def:'Water management is a critical factor.', bullets:['Environmental constraints','Resource optimization','Efficiency-led','Regional adaptation'] },
          { name:'Australia', def:'Predominantly hectares. Large-scale operations.', bullets:['Extreme variability','Operational resilience','Planning priority','Scale farming'] }
        ]
      },
      orgs: {
        eyebrow: 'Exploration · 28 agricultural organizations',
        title: 'Experience accumulated across the agricultural value chain.',
        supporting: 'Different organizations solve different problems. Understanding how they connect creates better products.',
        bulletsLabel: '',
        items: [
          { name:'Crop Protection', def:'Defending yield across the season.' },
          { name:'Seeds & Genetics', def:'Engineering the starting point of the crop.' },
          { name:'Biologicals', def:'Commercializing living agricultural products.' },
          { name:'Agricultural OEMs', def:'Machines and the data they generate.' },
          { name:'Precision Agriculture', def:'Decisions at sub-field resolution.' },
          { name:'Ag Retail', def:'Where products meet the grower.' },
          { name:'Advisory Services', def:'Expertise delivered as a service.' },
          { name:'Farm Management Platforms', def:'The operational system of record.' },
          { name:'Sustainability Programs', def:'Outcomes measured and verified.' },
          { name:'Food & Supply Chain', def:'From field through to the shelf.' },
          { name:'Financial & Insurance', def:'Pricing and protecting agricultural risk.' },
          { name:'AgTech Startups', def:'New solutions moving fast.' },
          { name:'Research Organizations', def:'Turning science into practice.' },
          { name:'Data & Analytics Platforms', def:'Making agricultural data usable.' },
          { name:'Ag Logistics', def:'Moving agricultural product at scale.' }
        ]
      }
    };