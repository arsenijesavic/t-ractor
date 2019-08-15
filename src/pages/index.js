import React, { Component } from 'react'
import { Link } from 'gatsby'

import { Flex, Box } from '@rebass/grid'
import Layout from '../components/layout'
import {
  Button,
  Input,
  //Modal
} from '../components'
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
      <Layout>
        <Flex
          style={{ height: '100vh' }}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box p={2} style={{ textAlign: 'center' }}>
            <h1>T.Ractor</h1>
            <h4 style={{ fontWeight: '100' }}>everyday life poetry</h4>
          </Box>
          {/* <Box p={2}>
            <Poems data={poems} />
          </Box> */}
          <Box p={2}>
            <CreatePoem />
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default IndexPage

class CreatePoem extends Component {
  state = {
    user: '',
    timer: null,
    times: Array.from({ length: 60 / 5 }, (v, i) => (i + 1) * 5),
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { user, timer } = this.state
    const data = { user, timer }

    return (
      <div style={{ padding: '1.5em' }}>
        <Input
          placeholder="Type your name"
          name="user"
          value={user}
          onChange={this.handleChange}
        />

        {/* <Flex style={{ padding: '1em 0' }} flexWrap="wrap">
          <Box width={getWidth(12)}>
            <label htmlFor="">Timer</label>
          </Box>
          {times &&
            times.map((e, i) => (
              <Box key={i} p={2} width={getWidth(1)}>
                <Select
                  selected={timer === e}
                  onClick={() =>
                    this.handleChange({
                      target: {
                        name: 'timer',
                        value: timer === e ? 0 : e,
                      },
                    })
                  }
                >
                  {e}s
                </Select>
              </Box>
            ))}
        </Flex> */}

        <Link to="/chat" state={{ ...data }}>
          <Button>Create Poem</Button>
        </Link>
      </div>
    )
  }
}
