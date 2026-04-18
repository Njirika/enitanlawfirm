import { BlogService } from "../../packages/db/src/services/blog.service";

async function seed() {
  try {
    console.log("Seeding professional blog posts...");

    const posts = [
      {
        title: "Navigating the Legal Landscape of Nigeria's Petroleum Industry Act",
        slug: "navigating-nigeria-petroleum-industry-act",
        excerpt: "An in-depth analysis of the PIA and its implications for international investors and local stakeholders in the Nigerian energy sector.",
        content: `
          <h2>Overview of the Petroleum Industry Act (PIA)</h2>
          <p>The Petroleum Industry Act (PIA) 2021 represents a landmark shift in the governance, administration, and fiscal framework of Nigeria's energy sector. After decades of legislative stalemate, the Act aims to provide a more transparent and competitive environment for global energy players.</p>
          
          <h3>Key Structural Changes</h3>
          <p>The Act introduced a clear separation between policy, regulation, and commercial operations. The creation of the Nigerian Upstream Petroleum Regulatory Commission (NUPRC) and the Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA) provides specialized oversight across the value chain.</p>
          
          <h3>Investment Implications</h3>
          <p>For international investors, the PIA offers a renewed sense of stability. The transition of NNPC into a commercially driven entity (NNPC Ltd) signals a commitment to global best practices in corporate governance. Our firm remains at the forefront of advising clients on navigating these regulatory transitions.</p>
          
          <blockquote>
            "The PIA is not just a law; it is a catalyst for economic transformation in West Africa's most significant energy market."
          </blockquote>
          
          <p>Strategic compliance and early alignment with the new host community development requirements are critical for sustainable operations in the current climate.</p>
        `,
        category: "Oil & Gas",
        author: "Enitan Afolabi & Co. Editorial Team",
        featuredImage: "/images/blog-oil-gas.png",
        published: true,
        publishedAt: new Date()
      },
      {
        title: "Maritime Security and Legal Protections in the Gulf of Guinea",
        slug: "maritime-security-legal-protections-gulf-guinea",
        excerpt: "Exploring the evolving legal frameworks for maritime safety and the protection of commercial interests in West African waters.",
        content: `
          <h2>The Evolving Maritime Legal Framework</h2>
          <p>Security in the Gulf of Guinea remains a critical concern for international shipping and trade. The Suppression of Piracy and Other Maritime Offences (SPOMO) Act has significantly bolstered Nigeria's legal arsenal against maritime threats.</p>
          
          <h3>The Deep Blue Project and Legal Enforcement</h3>
          <p>Legal enforcement now works hand-in-hand with technological integration. The implementation of the Deep Blue Project has not only improved physical security but also provided the necessary evidentiary support for legal proceedings under the SPOMO Act.</p>
          
          <h3>Protecting Commercial Interests</h3>
          <p>Commercial entities must understand the jurisdictional complexities when operating in territorial waters vs. the Exclusive Economic Zone (EEZ). Our maritime practice provides specialized guidance on contract clauses related to security, insurance, and force majeure in this high-stakes environment.</p>
          
          <img src="/images/blog-maritime-security.png" alt="Maritime Security" />
          
          <p>As Nigeria continues to strengthen its maritime presence, stakeholders can expect more rigorous inspections and stricter compliance with international maritime labor conventions.</p>
        `,
        category: "Maritime",
        author: "Enitan Afolabi & Co. Editorial Team",
        featuredImage: "/images/blog-maritime-security.png",
        published: true,
        publishedAt: new Date()
      },
      {
        title: "Modernizing Banking Regulations: A Guide for International Investors in Nigeria",
        slug: "modernizing-banking-regulations-nigeria",
        excerpt: "A comprehensive overview of recent regulatory changes in the Nigerian banking sector and what they mean for global financial entities.",
        content: `
          <h2>A New Era in Nigerian Banking</h2>
          <p>The Central Bank of Nigeria (CBN) has recently introduced series of reforms aimed at strengthening the resilience of the nation's financial system. From recapitalization mandates to enhanced anti-money laundering (AML) protocols, the landscape is shifting rapidly.</p>
          
          <h3>Digital Currency and Fintech Integration</h3>
          <p>The rise of the eNaira and the integration of advanced fintech solutions have created new legal frontiers in data privacy and digital asset regulation. Understanding the balance between innovation and regulatory compliance is paramount for any financial institution operating in Nigeria.</p>
          
          <h3>Capital Adequacy and Risk Management</h3>
          <p>Recent directives on capital adequacy ratios directly affect the expansion strategies of both local and international banks. We provide deep-dive analysis on the implications of these changes for cross-border syndications and trade finance.</p>
          
          <p>As the "Giant of Africa" modernizes its financial infrastructure, the role of legal counsel in mitigating regulatory risk has never been more vital.</p>
        `,
        category: "Banking & Finance",
        author: "Enitan Afolabi & Co. Editorial Team",
        featuredImage: "/images/blog-banking-finance.png",
        published: true,
        publishedAt: new Date()
      }
    ];

    for (const post of posts) {
      console.log(`Inserting post: ${post.title}`);
      await BlogService.createPost(post as any);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
