import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrap = styled.header`
  z-index: 900;
  padding: 0.5em;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Iner = styled.div`
  /* width: 960px;
  margin: 0 auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`

const Nav = styled.nav`
  width: 50%;
  align-self: center;

  > ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    list-style: none;

    > li {
      cursor: pointer;
      padding: 0;
      margin: 0;
      > a.active {
        border-bottom: 1px solid black;
      }
      > a {
        text-transform: uppercase;
        color: black;
      }
    }
  }
`

const Header = ({ type }) => {
  return (
    <Wrap>
      <Iner>
        <Nav>
          <ul>
            {[
              "about",
              // 'practice',
              // 'team',
              // 'contact',
            ].map((link, i) => (
              <li key={i}>
                <Link to={`/${link}`}>{link}</Link>
              </li>
            ))}
          </ul>
        </Nav>
      </Iner>
    </Wrap>
  )
}

Header.propTypes = {}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
