import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Avatar from "../components/Avatar"

const SecondPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="avatar">
      <Avatar />
    </div>
    <article class="about">
      <h1>Wilman Arambillete</h1>
      <p>I'm am enthusiastic software professional who works at <a href="https://www.netsuite.com/portal/home.shtml" target="_blank" rel="noopener noreferrer">Oracle - NetSuite</a></p>
      <p>I have a unique passion for learning about technology and sharing what I have learned. I also love writing, so these two qualities combined gave birth to this blog.</p>
      <p>In my daily routine I manage a great team of solutions engineers to help partners with their technical enablement. This role has helped me to obtain a great deal of experience on diverse platforms and technologies.</p> 
      <p>During my free time, in addition to spending quality time with my family, I also enjoy learning new programming languages and software trends.</p>
      <p>Therefore, blogging has provided me with a space where I can put my ideas toghether and share them at the same time with the rest of the community</p>
      <p>I am true believer that the knowledge belongs to the people</p>
    </article>
  </Layout>
)

export default SecondPage
