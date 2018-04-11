
// Addcat component is responsiable for collecting the categories name input
import React from 'react'

const Addcat = (props) => {

  return (
    <div className="addlinkbar">
      <input index="catname" type="text" ref={(ref)=>{this.inputcat=ref}}/>
      <button onClick={()=>{props.handleAddCat(this.inputcat.value)}}>AddCategory</button>
      <button onClick={props.close}>X</button>
    </div>
  )
}

export default Addcat
