import React, { useState, useEffect, useRef } from 'react'

import { IChildHeights, useChildsDidUpdate } from 'childs-told-parent'
import 'childs-told-parent/dist/index.css'
import { useDispatch } from 'react-redux'
import { appActions } from './redux-store/slice'

const rawChildsList: string[] = ['child1', 'child2', 'child3']

const sumHeights = (childsHeights: IChildHeights): number => {
  const keys = Object.keys(childsHeights)
  let sum = 0
  keys.forEach((key) => {
    sum += childsHeights[key]
  })
  return sum
}

const App: React.FC<{}> = () => {
  const [childsList, setChildsList] = useState(rawChildsList)
  const [height, setHeight] = useState(0)
  const onAllChildsReady = (childsHeights: IChildHeights) => {
    console.log('Parent: ', childsHeights)
    const newHeight = sumHeights(childsHeights)
    setHeight(newHeight + 20)
  }

  const [] = useChildsDidUpdate(childsList.length, onAllChildsReady)
  const handleInpuBlur = (e: React.FocusEvent<any>) => {
    const newValue = e.currentTarget.value
    const newList = [...childsList, newValue]
    setChildsList(newList)
  }
  return (
    <>
      <div
        className='zouza'
        style={{
          minHeight: height,
          background: 'blue',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {childsList.map((x) => (
          <ChildHasChanges key={x} />
        ))}
        Parent Height : {height} (Chils Heights + 20)
      </div>
      <div className='editingZone'>
        <p> Add New Child</p>
        <input type='text' onBlur={handleInpuBlur} />
      </div>
    </>
  )
}

interface IChildProps {
  id: string
}

const ChildHasChanges: React.FC<IChildProps> = ({ id }) => {
  const dispatch = useDispatch()
  const [counter, setCounter] = useState(50)
  const childRef = React.useRef<HTMLDivElement | any>()
  useDidUpdate(() => {
    debugger
    if (childRef.current) {
      dispatch(
        appActions.setChildHeight({
          key: id,
          newHeight: childRef.current!.offsetHeight
        })
      )
    }
  }, [counter])

  useEffect(() => {
    debugger
    if (childRef.current) {
      dispatch(
        appActions.setChildHeight({
          key: id,
          newHeight: childRef.current!.offsetHeight
        })
      )
    }
  }, [])

  const updateCount = () => {
    setCounter((x) => x + 1)
  }
  return (
    <div
      style={{ height: counter, background: 'red', display: 'flex' }}
      ref={childRef}
    >
      <p>Height : {counter}</p>
      <button onClick={updateCount}>Add Height</button>
    </div>
  )
}

function useDidUpdate(callback: () => void, deps: any[]) {
  const hasMount = useRef(false)
  useEffect(() => {
    if (hasMount.current) {
      callback()
    } else {
      hasMount.current = true
    }
  }, deps)
}

export default App
