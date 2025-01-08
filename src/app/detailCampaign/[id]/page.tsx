import React from "react";

// Define a class to encapsulate campaign details
class Campaign {
  constructor(
    public title: string,
    public category: string,
    public description: string,
    public fundingDetails: FundingDetails,
    public companyInfo: CompanyInfo,
    public mediaAndPitch: MediaAndPitch,
    public personalizedMessage: string,
    public motivationLetter: string,
    public contactInformation: ContactInformation
  ) {}
}

class FundingDetails {
  constructor(
    public targetAmount: number,
    public fundingType: string,
    public deadline: string,
    public fundsRaised: number,
    public minimumInvestment: number,
    public progress: string
  ) {}
}

class CompanyInfo {
  constructor(
    public name: string,
    public overview: string,
    public team: { name: string; role: string }[]
  ) {}
}

class MediaAndPitch {
  constructor(
    public pitchDeck: string,
    public media: string[],
    public links: string[]
  ) {}
}

class ContactInformation {
  constructor(
    public name: string,
    public phone: string,
    public address: string,
    public email: string
  ) {}
}

const DetailCampaign: React.FC = () => {
  const campaign = new Campaign(
    "Eco-Friendly Packaging Startup",
    "Sustainability",
    "We are developing innovative, eco-friendly packaging solutions to reduce plastic waste and promote sustainability. Our products are biodegradable and made from renewable resources.",
    new FundingDetails(100000, "Equity", "30 days", 60000, 500, "60%"),
    new CompanyInfo("GreenPack Solutions", "GreenPack Solutions is committed to creating sustainable packaging alternatives. Our team is composed of experts in materials science and environmental engineering.", [
      { name: "Alice Johnson", role: "CEO" },
      { name: "Bob Smith", role: "CTO" },
    ]),
    new MediaAndPitch(
      "https://example.com/pitchdeck.pdf",
      [
        "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-260nw-1371521327.jpg",
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/Best_marketing_campaigns.jpg",
        "https://online.sbu.edu/sites/default/files/field/image/successful%20marketing%20campaigns%20202.jpg",
        "https://www.kobadvertising.com/wp-content/uploads/2019/12/shutterstock_759471151-900x506.jpg",
      ],
      ["https://example.com/demo", "https://example.com/article"]
    ),
    "We believe in a sustainable future and need your support to make it a reality.",
    "Dear Investor, our motivation to create eco-friendly packaging stems from our commitment to the environment. With your investment, we can scale our operations and make a significant impact.",
    new ContactInformation(
      "Duncan Higgins",
      "+1 (798) 148-3784",
      "Voluptatem Ut delec",
      "lejyqyge@mailinator.com"
    )
  );

  return (
    <div className="p-10 pt-20">
      {/* Campaign Header Image */}
      <img
        className="w-full h-[300px] object-cover rounded-lg"
        src="https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU="
        alt="campaign"
      />

      {/* Campaign Title and Description */}
      <h2 className="lg:text-5xl md:text-3xl text-2xl mt-5">{campaign.title}</h2>
      <p className="text-gray-500 mt-5 md:text-lg text-sm">{campaign.description}</p>

      {/* Funding Details Section */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-8">
        <DetailsCard title="Funding Details">
          <DetailRow label="Target Amount" value={`$${campaign.fundingDetails.targetAmount}`} />
          <DetailRow label="Funding Type" value={campaign.fundingDetails.fundingType} />
          <DetailRow label="Deadline" value={campaign.fundingDetails.deadline} />
          <DetailRow
            label="Progress"
            value={
              <div className="bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-5 rounded-full"
                  style={{ width: campaign.fundingDetails.progress }}
                ></div>
              </div>
            }
          />
          <DetailRow label="Funds Raised" value={`$${campaign.fundingDetails.fundsRaised}`} />
          <DetailRow label="Minimum Investment" value={`$${campaign.fundingDetails.minimumInvestment}`} />
        </DetailsCard>

        {/* Company Info Section */}
        <DetailsCard title="Company Info">
          <DetailRow label="Name" value={campaign.companyInfo.name} />
          <DetailRow label="Overview" value={campaign.companyInfo.overview} />
          <DetailRow
            label="Team"
            value={
              <ul>
                {campaign.companyInfo.team.map((member, index) => (
                  <li key={index}>{`${member.name} (${member.role})`}</li>
                ))}
              </ul>
            }
          />
        </DetailsCard>

        {/* Contact Information Section */}
        <DetailsCard title="Contact Information">
          <DetailRow label="Name" value={campaign.contactInformation.name} />
          <DetailRow label="Phone" value={campaign.contactInformation.phone} />
          <DetailRow label="Address" value={campaign.contactInformation.address} />
          <DetailRow label="Email" value={campaign.contactInformation.email} />
        </DetailsCard>
      </div>
    </div>
  );
};

// Reusable Card Component
const DetailsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
    {children}
  </div>
);

// Reusable Row Component
const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="border-b border-gray-300 py-4">
    <div className="font-bold text-gray-800">{label}:</div>
    <div className="text-gray-600">{value}</div>
  </div>
);

export default DetailCampaign;
