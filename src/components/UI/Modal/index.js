import React from "react"
import RCModal from "react-modal"

const defaultStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: "9999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "100vh",
    overflow: "scroll",
  },

  content: {
    maxWidth: "960px",
    position: "static",
    padding: "0",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
    border: "none",
    borderRadius: "0",
    background: "white",
  },
}

if (typeof window !== "undefined") {
  RCModal.setAppElement("body")
}

const Modal = ({ icon, title, style, isOpen, onClose, children }) => (
  <RCModal
    contentLabel={title}
    isOpen={isOpen}
    onRequestClose={onClose}
    style={{
      ...defaultStyle,
      ...style,
    }}
  >
    {children}
  </RCModal>
)

export default Modal
