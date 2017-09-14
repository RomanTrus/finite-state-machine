class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config=config;
    	this.state=config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	if (state in this.config.states) {
    	  this.state=state;
    	} else {throw new Error()};
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (event in this.config.states[this.state].transitions){
      this.state=this.config.states[this.state].transitions[event];
    }else {
      throw new Error();
    }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state=this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (event===undefined){
      var arrStates=[];
      for (var key in this.config.states){
        arrStates.push(key);
      }
      return arrStates;
    }

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
