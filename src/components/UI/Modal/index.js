import React from "react"
import styled from "styled-components"
import RCModal from "react-modal"

const duration = 300

const defaultStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    zIndex: "9999",
    overflow: "auto",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadisu: "2px",
    background: "rbga(0,0,0,0.8)",
    //boxShadow: '0 15px 30px 0 rgba(0, 0, 0, 0.11)',
    transition: `all ${duration}ms ease-in-out`,
    overflow: "auto",
  },
}

if (typeof window !== "undefined") {
  RCModal.setAppElement("body")
}

const Header = styled.header`
  background: white;
  padding: 1.5em;
  display: flex;
  border-bottom: 1px solid white;
`
const Title = styled.h3`
  font-size: 1.5em;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  align-self: center;
  vertical-align: middle;
  flex-grow: 1;
  letter-spacing: 0.05em;
`

const Modal = ({ title, style, isOpen, onClose, children }) => (
  <RCModal
    contentLabel={title}
    isOpen={isOpen}
    onRequestClose={onClose}
    style={{
      ...defaultStyle,
      ...style,
    }}
  >
    {title && (
      <Header>
        <Title>{title}</Title>
      </Header>
    )}
    {children}
  </RCModal>
)

export default Modal
