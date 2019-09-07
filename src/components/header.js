import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Box } from "@rebass/grid"
import { ifProp } from "styled-tools"
import { motion } from "framer-motion"

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <HamburgerMenuWrap>
      <Box>
        <button
          style={{ padding: "0", position: "relative", zIndex: "9999" }}
          className={`hamburger hamburger--stand ${isOpen ? "is-active" : ""}`}
          type="button"
          onClick={() => (isOpen ? setOpen(false) : setOpen(true))}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </Box>

      <HamburgerWrap isOpen={isOpen}>
        <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
          <ul>
            {[
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
              { name: "Poems", url: "/poems" },
              { name: "Team", url: "/team" },
              { name: "Tools", url: "/tools" },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.url} activeClassName="active">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </HamburgerWrap>
    </HamburgerMenuWrap>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header

const HamburgerMenuWrap = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem;
  max-width: 980px;
  margin: 0 auto;
`

const HamburgerWrap = styled.div`
  position: fixed;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${ifProp("isOpen", "100%", "0")};
  background: white;
  color: black;
  transition: all 0.3s ease-in-out;

  > nav {
    margin-top: 2.25em;
    opacity: ${ifProp("isOpen", "1", "0")};
    display: flex;
    justify-content: center;
    align-items: stretch;
    > ul {
      text-align: center;
      list-style: none;
      margin: 0;
      padding: 0;
      > li {
        margin: 0;
        padding: 0;
        margin: 1.875rem 0;
      }
    }
  }
`

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}
