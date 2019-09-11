import React, { useState, useEffect, useRef } from "react"
import { useAsync } from "react-use"
import styled from "styled-components"
import { Flex, Box } from "@rebass/grid"
import Layout from "@components/layout"
import { Modal, Input } from "@components"
import { getPoems } from "@module/firebase"

const Wrap = styled(Flex)`
  flex-flow: column nowrap;
  align-items: stretch;
  max-width: 980px;
  min-height: 100vh;
  margin: 0 auto;
`

const IndexPage = props => {
  const { value: poems, loading } = useAsync(async () => {
    return await getPoems()
  }, [])

  if (loading) return null

  return (
    <Layout title="home">
      <Wrap>
        <Box p={2} style={{ textAlign: "center" }} flex="1 0 auto">
          <h1>T.Ractor</h1>
          <h4 style={{ fontWeight: "100" }}>EveryDayLifePoetry</h4>
        </Box>

        <Box p={2} flex="1 0 auto">
          <CreatePoemForm
            onSubmit={data => props.navigate("/chat", { state: data })}
          />
        </Box>

        <Box p={2}>
          <Poems data={poems && poems} />
        </Box>
      </Wrap>
    </Layout>
  )
}

export default IndexPage

const CreatePoemForm = ({ onSubmit }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  const handleSubmit = e => {
    e.preventDefault()

    onSubmit &&
      onSubmit({
        user: inputRef.current.value,
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ textAlign: "center" }} htmlFor="user">
        Type your name and press enter to start
      </label>
      <Input ref={inputRef} name="user" style={{ textAlign: "center" }} />
    </form>
  )
}

const Poems = ({ data }) => {
  const [selectedPoem, setSelectedPoem] = useState(null)
  const isModalOpen = selectedPoem !== null

  return (
    <>
      <h3 style={{ fontWeight: "100" }}>Poems</h3>
      <Flex>
        {data &&
          Object.keys(data).map((name, i) => (
            <Box
              key={i}
              mt={2}
              p={2}
              style={{
                cursor: "pointer",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
              onClick={() => setSelectedPoem(data[name])}
            >
              {/* <p style={{ fontSize: "0.5em" }}>{dec2bin(name)}</p> */}
              <p style={{ padding: "0", margin: "0" }}>{name}</p>
            </Box>
          ))}
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setSelectedPoem(null)}>
        <div style={{ background: "white", padding: "2em" }}>
          {/* <h4>{poemName}</h4>
            <h1> {user && user.toUpperCase()} T-Ractor</h1> */}

          <div style={{ padding: "2em" }}>
            {selectedPoem &&
              selectedPoem.map((v, i) => <p key={i}>{v.text}</p>)}
          </div>
        </div>
        {/* {selectedPoem && (
          <div style={{ background: "white", padding: "1.5em" }}>
            <h6 style={{ marginBottom: "2.5em", opacity: "0.5" }}>
              {dec2bin(selectedPoem.name)}
            </h6>
            <h2>{selectedPoem.name}</h2>
            <h4>{selectedPoem.username}</h4>
            {selectedPoem &&
              selectedPoem.map((v, i) => <p key={i}>{v.text}</p>)}
          </div>
        )} */}
      </Modal>
    </>
  )
}
