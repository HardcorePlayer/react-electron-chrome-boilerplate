/**
 * website boot
 */

import * as React from 'react'
import { render } from 'react-dom'
import Root from './'


/// code

/**
 * install mount node if not found by id
 */
function ensureMountNode(id: string): HTMLElement {
  const node = document.getElementById(id)

  if(node) return node

  const mount = document.createElement('div')
  mount.id = id

  if(!document.body) {
    throw new Error(
      `document.body not found`
    )
  }

  document.body.appendChild(mount)

  return mount
}

function main() {
  render(React.createElement(Root), ensureMountNode('app'))
}


/// run

main()
