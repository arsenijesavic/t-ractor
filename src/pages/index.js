import React, { Component } from "react"
import { Flex, Box } from "@rebass/grid"

import Layout from "../components/layout"
import Header from "../components/header"
import {
  Button,
  Input,
  //Modal
} from "../components"
//import { getPoems } from '../module/firebase'
// import dec2bin from '../utils/dec2bin'

class IndexPage extends Component {
  state = {}

  async componentDidMount() {
    //const poems = await getPoems()
    // this.setState({ poems })
  }

  render() {
    // const { poems } = this.state

    return (
      <>
        <Layout>
          <Header />
          <Flex
            style={{ height: "90vh" }}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box p={2} style={{ textAlign: "center" }}>
              <h1>T.Ractor</h1>
              <h4 style={{ fontWeight: "100" }}>EveryDayLifePoetry</h4>
            </Box>
            {/* <Box p={2}>
            <Poems data={poems} />
          </Box> */}
            <Box p={2}>
              <CreatePoem
                onSubmit={data => this.props.navigate("/chat", { state: data })}
              />
            </Box>
          </Flex>
        </Layout>
      </>
    )
  }
}

export default IndexPage

class CreatePoem extends Component {
  state = {
    user: "",
    timer: null,
    times: Array.from({ length: 60 / 5 }, (v, i) => (i + 1) * 5),
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit({ ...this.state })
  }

  render() {
    const { user } = this.state
    return (
      <div style={{ padding: "1.5em" }}>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Type your name and press Enter to start"
            name="user"
            value={user}
            onChange={this.handleChange}
          />

          <Button type="submit">Create Poem</Button>
        </form>
      </div>
    )
  }
}
