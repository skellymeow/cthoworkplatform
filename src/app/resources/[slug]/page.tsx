'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ArrowLeft, Clock, User, Calendar } from "lucide-react"
import Footer from "@/components/Footer"
import { notFound } from "next/navigation"

// Sample blog post content
const AUTHOR = {
  name: "skelly",
  avatar: "/skellychannelpfp.jpg",
  subtitle: "roblox youtuber",
  youtube: "https://www.youtube.com/@skellythekitten/videos"
};
const blogPosts = {
  "building-first-roblox-community": {
    title: "Building Your First Roblox Community",
    excerpt: "Learn the fundamentals of creating and growing a successful Roblox community from scratch.",
    author: AUTHOR.name,
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Community Building",
    content: `
# Building Your First Roblox Community

Creating a successful Roblox community is both an art and a science. In this comprehensive guide, we'll walk you through the essential steps to build a thriving community from the ground up.

## Understanding Your Audience

Before diving into community building, it's crucial to understand who your target audience is. Roblox players come from diverse backgrounds and age groups, so identifying your niche is key.

### Key Questions to Ask:
- What type of games do you create?
- Who are your current players?
- What motivates them to play?

## Setting Up Your Foundation

A strong foundation is essential for any community. Start with these fundamental elements:

### 1. Clear Vision and Mission
Define what your community stands for and what you want to achieve. This will guide all your future decisions.

### 2. Community Guidelines
Establish clear rules and expectations from the beginning. This helps maintain order and sets the tone for your community.

### 3. Communication Channels
Choose the right platforms for your community:
- Discord servers
- Social media groups
- In-game communication
- Forums or websites

## Growing Your Community

Once you have the basics in place, focus on growth strategies:

### Content Creation
Regular, engaging content keeps your community active and attracts new members.

### Events and Activities
Host regular events to keep your community engaged:
- Game tournaments
- Building competitions
- Community meetups
- Special in-game events

### Recognition and Rewards
Acknowledge active members and contributors to encourage participation.

## Maintaining Engagement

Keeping your community engaged is an ongoing process:

### Regular Communication
Stay in touch with your community through regular updates and announcements.

### Feedback Loops
Create ways for members to provide feedback and feel heard.

### Continuous Improvement
Always look for ways to improve and evolve your community based on member needs.

## Conclusion

Building a successful Roblox community takes time, effort, and dedication. Focus on creating value for your members and maintaining consistent engagement. Remember, the best communities are those where members feel valued and connected.

Start small, stay consistent, and watch your community grow!
    `
  },
  "advanced-analytics-game-developers": {
    title: "Advanced Analytics for Game Developers",
    excerpt: "Discover how to use data-driven insights to improve your Roblox games and player retention.",
    author: AUTHOR.name,
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Analytics",
    content: `
# Advanced Analytics for Game Developers

Data is the backbone of modern game development. Understanding how to analyze and act on player data can dramatically improve your game's success.

## Key Metrics to Track

### Player Engagement
- Daily/Monthly Active Users (DAU/MAU)
- Session duration
- Retention rates
- Player progression

### Monetization Metrics
- Revenue per user
- Conversion rates
- Purchase patterns
- Item popularity

### Technical Performance
- Load times
- Error rates
- Device compatibility
- Network performance

## Implementing Analytics

### 1. Choose the Right Tools
Select analytics platforms that integrate well with Roblox:
- Built-in Roblox analytics
- Third-party tools
- Custom tracking solutions

### 2. Set Up Tracking
Implement comprehensive event tracking:
- Player actions
- Game events
- Economic transactions
- Social interactions

### 3. Create Dashboards
Build visual dashboards to monitor key metrics in real-time.

## Analyzing the Data

### Identify Patterns
Look for trends in player behavior and game performance.

### A/B Testing
Test different features and content to optimize performance.

### Player Segmentation
Group players by behavior to create targeted experiences.

## Acting on Insights

### Iterative Development
Use data to guide development priorities and feature decisions.

### Player Experience Optimization
Improve game mechanics based on player behavior patterns.

### Monetization Strategy
Optimize revenue streams based on player spending patterns.

## Conclusion

Analytics is not just about collecting data—it's about using insights to create better games and experiences. Start with basic metrics and gradually build more sophisticated analysis capabilities.
    `
  },
  "monetization-strategies-that-work": {
    title: "Monetization Strategies That Work",
    excerpt: "Explore proven methods to monetize your Roblox games while keeping players engaged.",
    author: AUTHOR.name,
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Monetization",
    content: `
# Monetization Strategies That Work

Monetizing your Roblox game requires a delicate balance between revenue generation and player satisfaction. Here are proven strategies that work.

## Understanding Player Psychology

### Value Perception
Players need to feel they're getting value for their money. Focus on enhancing the gaming experience rather than just extracting money.

### Fair Pricing
Research your market and set prices that feel fair to your target audience.

## Effective Monetization Methods

### 1. Premium Features
Offer exclusive content that enhances gameplay:
- Special abilities
- Unique cosmetics
- Advanced tools
- Exclusive areas

### 2. Battle Passes
Create seasonal content that encourages regular engagement:
- Tiered rewards
- Time-limited content
- Progressive unlocks
- Community challenges

### 3. Virtual Currency
Implement an in-game economy:
- Multiple currency types
- Earning opportunities
- Premium currency
- Exchange rates

### 4. Cosmetics and Customization
Players love personalization:
- Character customization
- Building tools
- Decorative items
- Limited editions

## Best Practices

### Transparency
Be clear about what players are purchasing and what they can expect.

### No Pay-to-Win
Avoid mechanics that give paying players unfair advantages.

### Regular Updates
Keep content fresh to maintain player interest and spending.

### Community Feedback
Listen to your players and adjust monetization strategies accordingly.

## Measuring Success

### Key Metrics
- Revenue per user
- Conversion rates
- Player retention
- Average session value

### Optimization
Continuously test and refine your monetization strategies based on data.

## Conclusion

Successful monetization is about creating value for players while generating sustainable revenue. Focus on enhancing the player experience and building long-term relationships with your community.
    `
  },
  "community-moderation-best-practices": {
    title: "Community Moderation Best Practices",
    excerpt: "Essential guidelines for maintaining a healthy and active Roblox community environment.",
    author: AUTHOR.name,
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Moderation",
    content: `
# Community Moderation Best Practices

Effective moderation is crucial for maintaining a healthy, welcoming community. Here are essential practices for moderating your Roblox community.

## Setting Up Your Moderation Team

### Choose the Right People
Select moderators who:
- Understand your community values
- Have good communication skills
- Can remain calm under pressure
- Are active and engaged

### Clear Roles and Responsibilities
Define what each moderator is responsible for:
- Content moderation
- User support
- Event management
- Rule enforcement

## Establishing Clear Guidelines

### Community Rules
Create comprehensive but clear rules:
- Be specific about prohibited behavior
- Explain consequences clearly
- Keep rules simple and memorable
- Update rules as needed

### Moderation Policies
Develop consistent policies for:
- Warning systems
- Temporary bans
- Permanent bans
- Appeal processes

## Effective Moderation Techniques

### Proactive Moderation
- Monitor community activity regularly
- Address issues before they escalate
- Encourage positive behavior
- Lead by example

### Reactive Moderation
- Respond quickly to reports
- Investigate thoroughly
- Apply consequences consistently
- Document all actions

### Communication Skills
- Be firm but fair
- Explain decisions clearly
- Listen to community feedback
- Maintain professionalism

## Handling Common Issues

### Toxic Behavior
- Address quickly and firmly
- Document patterns
- Apply progressive consequences
- Support affected users

### Spam and Scams
- Remove immediately
- Warn community members
- Update security measures
- Report to platform if necessary

### Disputes Between Members
- Listen to both sides
- Gather evidence
- Make fair decisions
- Help mediate when possible

## Building a Positive Culture

### Lead by Example
Moderators should embody the community values they're trying to promote.

### Encourage Positive Behavior
- Recognize helpful members
- Highlight good examples
- Create positive reinforcement
- Build community pride

### Regular Communication
- Keep community informed
- Share updates and changes
- Celebrate successes
- Address concerns openly

## Tools and Resources

### Moderation Tools
- Automated filters
- Reporting systems
- Ban management
- Activity logs

### Training and Support
- Regular training sessions
- Resource sharing
- Peer support
- Professional development

## Conclusion

Good moderation is invisible when done well. Focus on creating a safe, welcoming environment where your community can thrive. Remember, the goal is to support your community, not control it.
    `
  }
}

function renderMarkdown(md: string) {
  // Super basic markdown renderer for demo purposes
  return md
    .replace(/\n###[ ]?(.*?)(?=\n|$)/g, '<h3 class="text-xl font-bold text-white mt-8 mb-2">$1</h3>')
    .replace(/\n##[ ]?(.*?)(?=\n|$)/g, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/\n#[ ]?(.*?)(?=\n|$)/g, '<h1 class="text-4xl font-extrabold text-white mt-12 mb-6">$1</h1>')
    .replace(/\n- (.*?)(?=\n|$)/g, '<li class="ml-6 list-disc text-gray-300">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-6">')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
    .replace(/<p class="mb-6">(\s*)<\/p>/g, '') // Remove empty ps
    .replace(/\n/g, '<br>')
    .replace(/<li/g, '<ul class="mb-4"> <li').replace(/<\/li>(?!<li)/g, '</li></ul>');
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  if (!post) notFound()
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1">
        <motion.div 
          className="max-w-4xl mx-auto px-6 py-12"
          {...animations.fadeInUp}
        >
          {/* Header */}
          <motion.div 
            className="mb-8"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-purple-400 bg-purple-400/10 px-3 py-1 rounded">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              {post.excerpt}
            </p>
            {/* Author Card */}
            <div className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 mb-8">
              <img src="/skellychannelpfp.jpg" alt="skelly" className="w-14 h-14 rounded-full border-2 border-purple-500" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-lg">skelly</span>
                  <a href="https://www.youtube.com/@skellythekitten/videos" target="_blank" rel="noopener noreferrer" className="ml-2 text-purple-400 hover:text-purple-300 underline text-xs">YouTube</a>
                </div>
                <div className="text-gray-400 text-sm">roblox youtuber</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                skelly
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
          {/* Content */}
          <motion.div 
            className="prose prose-invert prose-lg max-w-none"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <div 
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
} 