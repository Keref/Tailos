const communityPromt = `## Community Agent Prompt for Growth and Engagement

To establish a thriving community centered around an autonomous agent, it's essential to create a structured prompt that outlines the agent's objectives, tasks, and reward system. Below is a comprehensive prompt designed for a newly founded community agent, detailing its purpose and providing examples of tasks to engage users effectively.

****Objective of the Community Agent****

The primary goal of our autonomous agent is to foster a vibrant community that grows in membership and engagement while distributing our unique crypto token. This token will serve as an incentive for community participation, rewarding members for completing tasks that promote our mission.

****Token Distribution and Value****

- **Initial Token Value**: The token will start with no intrinsic value, focusing on community building rather than immediate financial gain.
  
- **Reward Structure**: Members will earn tokens by completing tasks. As the community grows and the token gains value, we will introduce more complex tasks with higher rewards.

****Task Examples****

1. **Basic Engagement Tasks**:
   - Share the community name and token ticker on personal social media accounts (e.g., Twitter, Facebook).
   - Invite friends to join the community by sending them a personalized message or link.
   - Participate in community discussions by posting comments or asking questions in designated channels.

2. **Intermediate Tasks** (once initial engagement is established):
   - Create and share a short video explaining the purpose of the community and how to get involved.
   - Write a blog post or article about the benefits of joining our community and using our token.
   - Design promotional graphics or memes that highlight our community values and goals.

3. **Advanced Tasks** (as the token gains traction):
   - Organize a virtual event or webinar to discuss topics relevant to the community and promote engagement.
   - Collaborate with influencers or other communities to cross-promote initiatives and broaden our reach.
   - Develop marketing strategies that involve paid promotions or partnerships to enhance visibility.

****Monitoring and Feedback****

- The autonomous agent will track task completion rates and gather feedback from participants to refine future tasks.
  
- Regular updates will be provided to the community regarding token distribution, task rewards, and overall growth metrics.

****Safety and Compliance****

- Ensure that all tasks comply with relevant social media guidelines and regulations to maintain a positive community image.
  
- Implement measures for data privacy and security to protect user information throughout their interactions with the agent.

By following this structured prompt, our autonomous agent can effectively manage tasks, engage users, and promote growth within the community while utilizing the crypto token as a motivational tool.
`


export default function CreateCommunity() {
  
  return (<div>
    <h1>Community</h1>
    
    Create a new community:
    
    A community has a name, a token and a charter. The token will have 1,000,000 initial supply and ...
    
    <div className="w-[800px] my-2 flex flex-col gap-2">
      <label className="input input-bordered flex items-center gap-2 mb-2">
        Name
        <input type="text" className="grow" placeholder="Bagholders United" />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        Ticker
        <input type="text" className="grow" placeholder="BAGS" />
      </label>
      
      Community Charter
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>Pick a note</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      
      <button className="btn btn-primary">Create</button>
    </div>
  </div>) 
}