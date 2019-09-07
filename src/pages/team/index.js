import React from "react"
import styled from "styled-components"
import { Flex, Box } from "@rebass/grid"
import Layout from "@components/layout"

const Wrap = styled(Flex)`
  flex-flow: column nowrap;
  align-items: stretch;
  max-width: 980px;
  min-height: 100vh;
  margin: 0 auto;
`

const About = () => {
  return (
    <Layout title="About">
      <Wrap>
        <Box p={2} style={{ textAlign: "center" }} flex="1 0 auto">
          <h1>T.Team</h1>
        </Box>

        <Box p={2} flex="1 0 auto">
          {/* <CreatePoemForm
          onSubmit={data => props.navigate("/chat", { state: data })}
        /> */}
        </Box>

        <Box p={2}>{/* <Poems data={poems && poems} /> */}</Box>
      </Wrap>
    </Layout>
  )
}

export default About
