export interface Post {
  id: number;
  title: string;
  slug: string;
  author: string;
  authorImage: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "The Future of Sustainable Agriculture",
    slug: "future-of-sustainable-agriculture",
    author: "Jane Doe",
    authorImage: "/carrot.png",
    date: "2025-09-12",
    image: "/carrot.png",
    excerpt: "Discover how technology is revolutionizing farming and creating a more sustainable future for agriculture.",
    content: `
<p>The world is facing a critical challenge: how to feed a growing population while protecting the planet. Sustainable agriculture offers a solution, and technology is playing a key role in making it a reality.</p>

<h2>The Role of IoT in Farming</h2>
<p>The Internet of Things (IoT) is transforming agriculture by providing farmers with real-time data on everything from soil moisture to crop health. This data allows farmers to make more informed decisions, optimize resource use, and increase yields.</p>

<img src="/tomato.png" alt="Tomato" />

<h2>Blockchain for Supply Chain Transparency</h2>
<p>Blockchain technology is bringing unprecedented transparency to the agricultural supply chain. By creating a secure and immutable record of every transaction, blockchain helps to prevent fraud, ensure food safety, and empower consumers to make more informed choices.</p>

<h2>The Promise of AI</h2>
<p>Artificial intelligence (AI) is being used to analyze agricultural data and provide farmers with valuable insights. AI-powered tools can help farmers to identify pests and diseases, predict weather patterns, and optimize irrigation schedules.</p>

<p>The future of sustainable agriculture is bright. By harnessing the power of technology, we can create a more efficient, transparent, and environmentally friendly food system for generations to come.</p>
`,
  },
  {
    id: 2,
    title: "A Guide to Organic Farming",
    slug: "guide-to-organic-farming",
    author: "John Smith",
    authorImage: "/tomato.png",
    date: "2025-09-10",
    image: "/grapes.png",
    excerpt: "Learn the principles of organic farming and how to start your own organic garden.",
    content: `
<p>Organic farming is a holistic approach to agriculture that focuses on working with nature, rather than against it. It's about creating a healthy ecosystem that produces nutritious food without the use of synthetic pesticides and fertilizers.</p>

<h2>The Principles of Organic Farming</h2>
<ul>
  <li><strong>Soil Health:</strong> Organic farmers focus on building healthy soil through composting, cover cropping, and other natural methods.</li>
  <li><strong>Biodiversity:</strong> Organic farms are home to a wide variety of plants and animals, which helps to create a resilient and self-sustaining ecosystem.</li>
  <li><strong>Water Conservation:</strong> Organic farmers use a variety of techniques to conserve water, such as drip irrigation and mulching.</li>
</ul>

<img src="/lettuce.png" alt="Lettuce" />

<h2>Getting Started with Organic Gardening</h2>
<p>You don't need a large farm to practice organic farming. You can start your own organic garden in your backyard or even on your balcony. Here are a few tips to get you started:</p>

<ul>
  <li><strong>Start with healthy soil:</strong> Amend your soil with compost and other organic matter to create a nutrient-rich environment for your plants.</li>
  <li><strong>Choose the right plants:</strong> Select plants that are well-suited to your climate and growing conditions.</li>
  <li><strong>Water wisely:</strong> Water your plants deeply but infrequently to encourage deep root growth.</li>
  <li><strong>Control pests naturally:</strong> Use natural pest control methods, such as companion planting and beneficial insects, to keep pests at bay.</li>
</ul>

<p>Organic farming is a rewarding way to grow your own food and connect with nature. By following these simple principles, you can create a thriving organic garden that will provide you with fresh, healthy produce for years to come.</p>
`,
  },
];
