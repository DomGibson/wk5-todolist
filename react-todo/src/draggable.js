import React, { Component } from "react";
import { Draggable } from "react-drag-reorder";

class Drag extends Component {
  state = {
    words: ["Hello", "Hi", "How are you", "Cool"],
  };
  render() {
    return (
      <div className="flex-container">
        <div className="row">
          <Draggable>
            {this.state.words.map((word, idx) => {
              return (
                <div key={idx} className="flex-item">
                  {word}
                </div>
              );
            })}
          </Draggable>
        </div>
      </div>
    );
  }
}

export default Drag;