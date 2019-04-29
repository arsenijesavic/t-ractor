import React, { Component } from 'react'
import { Link } from 'gatsby'

import { Flex, Box } from '@rebass/grid'
import Layout from '../components/layout'
import { Button, Input, Modal, Select } from '../components'

//import { getPoems } from '../module/firebase'
import getWidth from '../utils/getWidth'
import dec2bin from '../utils/dec2bin'

class IndexPage extends Component {
  state = {}

  async componentDidMount() {
    //const poems = await getPoems()
    // this.setState({ poems })
  }

  render() {
    const { poems } = this.state

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
          <Box p={2}>
            <Poems data={poems} />
          </Box>
          <Box p={2}>
            <CreatePoem />
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default IndexPage

class Poems extends Component {
  state = {
    isOpen: false,
    selectedPoem: null,
  }

  openModal = () => this.setState({ isOpen: true })
  closeModal = () => this.setState({ isOpen: false })

  selectPoem = name => {
    const text = this.props.data[name]
    const { username } = this.props.data[name].find(v => v.username)
    this.setState({ selectedPoem: { name, text, username } })
  }

  showPoem = id => {
    this.openModal()
    this.selectPoem(id)
  }

  render() {
    const { data } = this.props
    const { isOpen, selectedPoem } = this.state

    return (
      <div style={{ padding: '1.5em' }}>
        {data && <h4 style={{ padding: '1em 0' }}>recent poems</h4>}
        <Flex>
          {data &&
            Object.keys(data).map((name, i) => {
              return (
                <Box
                  style={{ background: '#fffdf5', cursor: 'pointer' }}
                  key={i}
                  p={2}
                  mx={2}
                  onClick={() => this.showPoem(name)}
                >
                  <p style={{ fontSize: '0.5em' }}>{dec2bin(name)}</p>
                  <h4>{name}</h4>
                </Box>
              )
            })}
        </Flex>

        <Modal isOpen={isOpen} onClose={this.closeModal}>
          {selectedPoem && (
            <div style={{ background: 'white', padding: '1.5em' }}>
              <h6 style={{ marginBottom: '2.5em', opacity: '0.5' }}>
                {dec2bin(selectedPoem.name)}
              </h6>
              <h2>{selectedPoem.name}</h2>
              <h4>{selectedPoem.username}</h4>

              {selectedPoem && selectedPoem.text.map(v => <p>{v.text}</p>)}
            </div>
          )}
        </Modal>
      </div>
    )
  }
}

class CreatePoem extends Component {
  state = {
    user: '',
    timer: null,
    times: Array.from({ length: 60 / 5 }, (v, i) => (i + 1) * 5),
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { user, times, timer } = this.state
    const data = { user, timer }

    return (
      <div style={{ padding: '1.5em' }}>
        <Input
          placeholder="Type your name"
          name="user"
          value={user}
          onChange={this.handleChange}
        />

        <Flex style={{ padding: '1em 0' }} flexWrap="wrap">
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
        </Flex>

        <Link to="/chat" state={{ ...data }}>
          <Button>Create Poem</Button>
        </Link>
      </div>
    )
  }
}
