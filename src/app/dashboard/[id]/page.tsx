import AdminApprovalTabs from "./components/admin_approval_tabs"

interface campaignDataType {
    campaignId: string,
    campaignTitle: string,
    campaignDescription: string
}

const campaignData: campaignDataType  = {
    campaignId: "123",
    campaignTitle: "InnovateX: Accelerating Ideas into Impact",
    campaignDescription: "Empowering Tomorrow: Fueling Innovation, One Idea at a Time"
};

const pitch = `<div className="pitch-section">
  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
    Pitch for InnovateX: Accelerating Ideas into Impact
  </h1>

  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    In today’s fast-paced, innovation-driven economy, countless brilliant ideas never see the light of day simply because aspiring entrepreneurs lack the resources to transform their visions into reality. 
    InnovateX bridges this gap by creating a robust platform that empowers innovators to bring their ideas to life, unlocking unprecedented opportunities for growth and success.
  </p>

  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    At InnovateX, we aim to redefine how startups access funding, mentorship, and resources. Our mission is simple yet powerful: to provide a streamlined, data-driven ecosystem where entrepreneurs, investors, and mentors converge to fuel transformative ideas. InnovateX is not just a service; it is a movement designed to empower the next wave of creators, thinkers, and problem-solvers.
  </p>

  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">The Problem</h2>
  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    Over 90% of startups fail within their first five years. The primary reasons? Lack of funding, mentorship, and market validation. Investors, on the other hand, often struggle to identify high-potential startups amidst the noise, wasting time and resources on unvetted pitches. This disconnect between innovators and investors stifles innovation and limits market growth.
  </p>

  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">The Solution</h2>
  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    InnovateX is a platform-driven accelerator designed to address these inefficiencies. We leverage cutting-edge technology to curate, assess, and support promising startups while ensuring investors gain access to high-quality, de-risked opportunities.
  </p>

  <p className="text-lg md:text-xl leading-relaxed text-gray-300">Here’s how InnovateX works:</p>
  <ol className="text-lg md:text-xl leading-relaxed text-gray-300">
    <li>Startup Onboarding: Entrepreneurs submit their ideas through our platform, where AI-powered analysis evaluates their market potential, feasibility, and scalability.</li>
    <li>Mentorship Matching: We connect startups with industry-specific mentors, enabling guided development and strengthening business models.</li>
    <li>Investor Opportunities: Investors gain exclusive access to pre-vetted startups, categorized by sector, growth stage, and risk profile.</li>
    <li>End-to-End Support: From funding to scaling, InnovateX provides startups with the tools, training, and market insights they need to succeed.</li>
  </ol>

  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Why Invest in InnovateX?</h2>
  <ol className="text-lg md:text-xl leading-relaxed text-gray-300">
    <li>Massive Market Potential: With over 300 million startups worldwide and a global venture capital market projected to reach $1.2 trillion by 2030, the demand for a centralized innovation hub has never been higher.</li>
    <li>Proven Revenue Model: Our subscription-based model for investors, combined with equity-based partnerships with startups, ensures steady cash flow and long-term growth potential.</li>
    <li>Cutting-Edge Technology: InnovateX leverages AI, big data, and predictive analytics to identify high-potential startups and track market trends, creating a competitive edge.</li>
    <li>Scalability: Our platform is designed to scale globally, offering seamless integration with regional markets and creating localized opportunities.</li>
  </ol>

  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Our Impact</h2>
  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    By investing in InnovateX, you’re not just funding a business—you’re fueling innovation and enabling a global wave of startups to create jobs, solve real-world problems, and transform industries. Our vision is to democratize access to resources and opportunities for creators, ensuring no great idea goes unnoticed.
  </p>

  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">The Ask</h2>
  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    We are seeking $5 million in funding to expand our platform’s capabilities, enhance our AI technology, and grow our user base. Your investment will allow us to penetrate key markets, onboard more startups, and create a vibrant, self-sustaining ecosystem of innovation.
  </p>

  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Join Us</h2>
  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
    InnovateX is more than an investment opportunity—it’s a chance to be at the forefront of a revolution in innovation. Together, we can transform ideas into impactful ventures and create a brighter future for generations to come.
  </p>

  <p className="text-lg md:text-xl leading-relaxed text-gray-300">Let’s build the future together. Innovate with InnovateX.</p>
</div>

`

const fundingNDetails = `<div class="funding-details">
  <h3><strong>Goal</strong></h3>
  <p>
    We aim to raise <strong>₹10,00,000 (INR)</strong> to develop and launch InnovateX, our cutting-edge online platform that empowers startups to connect, collaborate, and grow. This funding goal is meticulously calculated to ensure efficient use of resources and guarantee a successful product launch.
  </p>

  <h3><strong>Budget Breakdown</strong></h3>
  <p>Here’s a transparent breakdown of how the funds will be utilized:</p>
  <ul>
    <li>
      <strong>Platform Development (50% - ₹5,00,000)</strong>
      <ul>
        <li>Building and optimizing the InnovateX web platform with seamless user experience, including core features like startup profiles, collaboration tools, and funding dashboards.</li>
      </ul>
    </li>
    <li>
      <strong>Marketing & Outreach (30% - ₹3,00,000)</strong>
      <ul>
        <li>Social media campaigns, paid advertisements, and strategic partnerships to reach our target audience of startups, investors, and mentors.</li>
      </ul>
    </li>
    <li>
      <strong>Operations & Team (15% - ₹1,50,000)</strong>
      <ul>
        <li>Hiring skilled developers, designers, and marketing personnel to ensure a robust and scalable platform.</li>
      </ul>
    </li>
    <li>
      <strong>Legal & Compliance (5% - ₹50,000)</strong>
      <ul>
        <li>Covering necessary registrations, legal documentation, and compliance with industry standards to provide a secure and trustworthy platform.</li>
      </ul>
    </li>
  </ul>

  <h3><strong>Rewards or Incentives (if applicable)</strong></h3>
  <p>We value our contributors and have designed exclusive rewards to show our appreciation:</p>
  <ul>
    <li>
      <strong>Supporter Tier (₹500 - ₹4,999)</strong>
      <ul>
        <li>A thank-you email and a special mention on our website as a "Founding Supporter."</li>
      </ul>
    </li>
    <li>
      <strong>Collaborator Tier (₹5,000 - ₹24,999)</strong>
      <ul>
        <li>Exclusive early access to InnovateX and a personalized shout-out on our social media pages.</li>
      </ul>
    </li>
    <li>
      <strong>Partner Tier (₹25,000+)</strong>
      <ul>
        <li>Lifetime premium membership of InnovateX, access to advanced tools, and a featured badge on your startup’s profile.</li>
      </ul>
    </li>
  </ul>
</div>
`

const teamAndBackground = `
<h3>Entrepreneur’s Profile</h3>
<p>The visionary behind InnovateX is a seasoned entrepreneur with over a decade of experience in the startup ecosystem. With a strong background in business strategy, technology, and venture capital, the founder has successfully scaled multiple startups and facilitated over $50 million in funding for innovative projects. Their ability to identify market gaps and build impactful solutions drives the mission of InnovateX.</p>
<br>
<h3>Team Members</h3>
<ul>
    <li><strong>John Carter</strong> (Chief Technology Officer): A software architect with 15 years of expertise in AI, big data, and platform development, John leads the tech team in building and optimizing InnovateX’s AI-powered platform.</li>
    <li><strong>Sarah Mitchell</strong> (Head of Partnerships): Sarah brings over 12 years of experience in corporate partnerships and venture funding. She focuses on building strategic alliances with investors, startups, and mentors.</li>
    <li><strong>Emily Zhang</strong> (Marketing Director): A digital marketing expert, Emily has a proven track record in scaling startups through innovative campaigns and audience engagement strategies. She drives brand awareness and community growth.</li>
    <li><strong>David Singh</strong> (Operations Lead): With a background in operations management and business analytics, David ensures seamless execution of InnovateX’s processes, maintaining efficiency and quality at every stage.</li>
</ul>
<br>
<h3>Track Record</h3>
<p>The InnovateX team has collectively:</p>
<ul>
    <li>Enabled funding for over 100 startups, with a combined valuation of $1 billion.</li>
    <li>Launched and scaled 5 technology platforms, successfully reaching millions of users globally.</li>
    <li>Built a network of over 500 investors and mentors, creating a thriving innovation ecosystem.</li>
    <li>Delivered tangible results, including increased ROI for investors and accelerated market entry for startups.</li>
</ul>
<br>
<p>By leveraging this diverse expertise, the InnovateX team is uniquely positioned to drive the success of the platform and deliver impactful outcomes for startups and investors alike.</p>
`

const bussinessAndMarket = `

<h3>Business Plan or Model</h3>
<p>InnovateX follows a subscription-based revenue model for investors, complemented by equity-based partnerships with startups. Investors pay a monthly fee to access pre-vetted startups, while InnovateX takes a small equity stake in each startup that is onboarded onto the platform. This dual revenue stream ensures steady cash flow while creating long-term value as startups scale and succeed.</p>
<p>The platform also generates revenue by offering premium services, such as mentorship packages, tailored market research reports, and exclusive investor events. InnovateX’s business strategy is centered around sustainable growth, increasing market penetration, and expanding the ecosystem to include additional services and features for both startups and investors.</p>
<br>
<h3>Market Analysis</h3>
<p>The global startup ecosystem is growing rapidly, with over 300 million startups worldwide. The venture capital market is projected to reach $1.2 trillion by 2030, indicating immense growth potential for centralized innovation hubs like InnovateX.</p>
<p>InnovateX targets early-stage startups, investors, and mentors within the technology, healthtech, fintech, and sustainability sectors. These markets are expanding rapidly, driven by technological advancements, evolving consumer needs, and global sustainability challenges.</p>
<br>
<p>Key market insights include:</p>
<ul>
    <li>The number of angel investors has increased by over 25% in the past five years, with a shift toward platform-driven investment opportunities.</li>
    <li>Startups within the tech sector saw record funding levels in 2023, signaling continued investor interest in the space.</li>
    <li>The demand for mentorship-driven accelerators is rising, with startups increasingly seeking guidance and support beyond just financial backing.</li>
</ul>
<br>
<h3>Competitive Analysis</h3>
<p>InnovateX operates in a competitive landscape that includes various startup accelerators, angel investing platforms, and crowdfunding websites. However, InnovateX differentiates itself through its unique combination of:</p>
<ul>
    <li><strong>AI-powered assessment:</strong> InnovateX leverages artificial intelligence to evaluate startups, ensuring that investors only have access to high-quality, de-risked opportunities.</li>
    <li><strong>Mentorship-driven approach:</strong> Unlike many platforms, InnovateX pairs startups with experienced mentors, adding value beyond just funding.</li>
    <li><strong>End-to-end support:</strong> InnovateX doesn’t just provide funding. We offer tools, resources, and market insights to help startups scale effectively.</li>
    <li><strong>Global scalability:</strong> Our platform is designed to be easily scalable, allowing us to expand into regional markets and create localized opportunities for startups and investors.</li>
</ul>
<br>
<p>Some of the key competitors in the market include platforms like AngelList, SeedInvest, and Crowdcube. While these platforms provide access to funding, InnovateX stands out by offering a holistic, end-to-end accelerator experience that combines technology, mentorship, and personalized support.</p>
`;

const planningAndExecution = `

<h3>Timeline and Milestones</h3>
<p>The following timeline outlines key phases of the InnovateX platform development and launch, along with the milestones we aim to achieve:</p>
<ul>
    <li><strong>Phase 1: Platform Development</strong> (Months 1-6)
        <ul>
            <li>Completion of core platform architecture</li>
            <li>AI-powered startup evaluation system integration</li>
            <li>Beta testing with selected startups and investors</li>
        </ul>
    </li>
    <li><strong>Phase 2: Market Expansion</strong> (Months 7-12)
        <ul>
            <li>Launch platform to the general public</li>
            <li>Onboard first 100 startups</li>
            <li>Start regional market expansion and build partnerships with key mentors</li>
        </ul>
    </li>
    <li><strong>Phase 3: Global Scaling</strong> (Months 13-24)
        <ul>
            <li>Expand platform globally, targeting high-growth regions</li>
            <li>Refine AI system and onboarding processes based on user feedback</li>
            <li>Achieve 1,000 startups onboarded</li>
        </ul>
    </li>
    <li><strong>Phase 4: Continuous Growth and Innovation</strong> (Beyond Year 2)
        <ul>
            <li>Introduce additional services such as custom market research and data-driven insights for investors</li>
            <li>Refine platform based on evolving market needs and user feedback</li>
        </ul>
    </li>
</ul>
<br>
<h3>Risk Assessment</h3>
<p>While InnovateX presents a compelling value proposition, we recognize several risks associated with our platform’s success:</p>
<ul>
    <li><strong>Market Competition:</strong> As the startup accelerator space is highly competitive, InnovateX will focus on its unique AI-driven approach and mentorship services to stay ahead.</li>
    <li><strong>Technology Adoption:</strong> The adoption of our AI-powered evaluation system could face resistance from traditional investors. We plan to address this by offering training, personalized onboarding, and clear data-backed evidence of the system’s efficacy.</li>
    <li><strong>Platform Scalability:</strong> Scaling InnovateX globally could lead to operational challenges. We will mitigate this by using a cloud-based infrastructure, ensuring that we can scale our platform smoothly without compromising quality.</li>
    <li><strong>Regulatory Compliance:</strong> Regulatory challenges may arise in different markets. We plan to work with legal experts to ensure full compliance with local laws and data protection standards.</li>
</ul>
<br>
<h3>Marketing and Promotion Plan</h3>
<p>Our marketing and promotion strategy will focus on raising awareness of InnovateX among both startups and investors. Key elements of our plan include:</p>
<ul>
    <li><strong>Social Media Campaigns:</strong> We will leverage platforms like LinkedIn, Twitter, and Instagram to engage with potential investors and startups, using targeted content and ads to increase visibility.</li>
    <li><strong>PR and Media Outreach:</strong> A strong PR campaign will be launched to highlight our unique offering and thought leadership in the accelerator and startup ecosystem.</li>
    <li><strong>Partnerships:</strong> We will partner with renowned startup events, accelerators, and tech conferences to build credibility and attract top-tier startups.</li>
    <li><strong>Influencer and Ambassador Programs:</strong> We will collaborate with industry influencers and startup mentors to spread the word about InnovateX and establish a strong brand presence.</li>
</ul>
<br>
<h3>Updates and Communication Plan</h3>
<p>We are committed to keeping our backers informed and involved in the growth of InnovateX. Our communication plan includes:</p>
<ul>
    <li><strong>Regular Updates:</strong> Monthly email newsletters will update investors and backers on the platform’s progress, new features, and key milestones.</li>
    <li><strong>Exclusive Webinars:</strong> We will host quarterly webinars where backers can engage with the team, ask questions, and learn about upcoming developments.</li>
    <li><strong>Backer Portal:</strong> A dedicated backer portal will allow investors and backers to track their investments, view real-time progress, and access exclusive content.</li>
    <li><strong>Open Communication:</strong> We will maintain a transparent approach, providing both positive and constructive feedback regarding challenges and achievements.</li>
</ul>

`;

const legalAndComplaince = `

<h3>Legal and Compliance Information</h3>
<p>InnovateX is fully committed to adhering to all legal and regulatory requirements to ensure a secure and compliant platform for both startups and investors. Key elements of our legal and compliance framework include:</p>
<ul>
    <li><strong>Permits and Licenses:</strong> InnovateX will obtain the necessary business licenses, including those related to operating a platform for startup funding and mentorship. We will ensure compliance with local business and tax laws across all operating regions.</li>
    <li><strong>Data Protection and Privacy:</strong> InnovateX will adhere to global data protection regulations such as GDPR and CCPA to ensure the privacy and security of user data. We will implement robust encryption and secure data management practices to protect all stakeholders.</li>
    <li><strong>Anti-Money Laundering (AML) and Know Your Customer (KYC):</strong> InnovateX will comply with AML and KYC regulations to verify the identity of investors and ensure that funds raised through the platform are sourced from legitimate channels.</li>
    <li><strong>Regulatory Compliance in Target Markets:</strong> We will work with legal experts to ensure that InnovateX adheres to any specific regulations in the regions where we operate, including financial services, crowdfunding, and startup accelerator laws.</li>
</ul>
<br>
<h3>Legal Disclaimers and Terms</h3>
<p>The following are the key legal disclaimers and terms related to the InnovateX platform:</p>
<ul>
    <li><strong>Usage of Funds:</strong> Funds raised through InnovateX will be allocated towards platform development, marketing, AI technology improvements, and global expansion. Specific usage of funds will be outlined in quarterly financial reports to ensure transparency.</li>
    <li><strong>Refund Policy:</strong> As a platform facilitating startup investments, InnovateX will not provide refunds for investments made by backers unless explicitly stated in the terms for specific campaigns or projects. Refund policies for individual startups will be determined by the respective entrepreneurs and outlined in their terms.</li>
    <li><strong>Intellectual Property:</strong> InnovateX will ensure that all intellectual property (IP) shared on the platform by startups remains protected and that necessary licenses and agreements are in place to safeguard innovations. Entrepreneurs will retain ownership of their IP, and InnovateX will have rights only for its platform usage.</li>
    <li><strong>Investor Terms:</strong> Investors on InnovateX will agree to the platform’s terms regarding investment amounts, risk disclosure, and potential outcomes. These terms will include clear information on the risk of startup failure and the lack of guarantees for returns.</li>
    <li><strong>Non-disclosure Agreements (NDAs):</strong> InnovateX will provide NDAs for investors, mentors, and startup founders to protect confidential information exchanged during the platform’s engagement. These agreements are mandatory for all parties participating in the platform.</li>
    <li><strong>Dispute Resolution:</strong> Any disputes related to the platform, its services, or investments will be handled through arbitration, and InnovateX will establish a process for dispute resolution in compliance with international and local laws.</li>
    <li><strong>Liability Limitations:</strong> InnovateX will limit its liability to the fullest extent allowed by law. While we strive to provide a secure and reliable platform, InnovateX is not responsible for any damages resulting from the failure of a startup, legal issues, or external factors beyond our control.</li>
</ul>

`; 

const contactInformation = `
<h3>Accessible Communication Channels</h3>
<p>We at InnovateX prioritize open and accessible communication. Reach out to us through the following channels:</p>
<ul>
    <li><strong>Email:</strong> <a href="mailto:support@innovatex.com">support@innovatex.com</a></li>
    <li><strong>Phone:</strong> +1-800-INNOVEX (+1-800-466-6839)</li>
    <li><strong>Website:</strong> <a href="https://www.innovatex.com" target="_blank">www.innovatex.com</a></li>
    <li><strong>Social Media:</strong></li>
    <ul>
        <li><a href="https://www.twitter.com/innovatex" target="_blank">Twitter</a></li>
        <li><a href="https://www.facebook.com/innovatex" target="_blank">Facebook</a></li>
        <li><a href="https://www.linkedin.com/company/innovatex" target="_blank">LinkedIn</a></li>
        <li><a href="https://www.instagram.com/innovatex" target="_blank">Instagram</a></li>
    </ul>
</ul>
<br>
<h3>Transparency</h3>
<p>At InnovateX, we are committed to maintaining transparency and accountability. All communication channels listed above are actively monitored by our support team to ensure timely and effective responses to your inquiries. Whether you have questions about our platform, partnerships, or investment opportunities, feel free to get in touch with us.</p>
<br>
<p>We value your feedback and are here to assist with any concerns or inquiries you may have. Let’s innovate together!</p>

`;

const AdminAprroval = async ({params}: {params : {id: string}})=>{
    const {id} = await params;

    //console.log(id)

    campaignData.campaignId = id;

    return(
        <div>
            <AdminApprovalTabs 
                campaignData={campaignData} 
                pitch={pitch} 
                fundingNDetails={fundingNDetails} 
                teamAndBackground={teamAndBackground} 
                bussinessAndMarket={bussinessAndMarket} 
                planningAndExecution={planningAndExecution} 
                legalAndComplaince={legalAndComplaince} 
                contactInformation={contactInformation}
            >
            </AdminApprovalTabs>
        </div>
    );
}

export default AdminAprroval;