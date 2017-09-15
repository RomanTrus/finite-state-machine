class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config=config;
    	this.state=config.initial;
      this.history=[config.initial];
      this.lastStep=[];
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
        this.history.push(this.state);
        this.lastStep=[];
    	} else {throw new Error()};
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (event in this.config.states[this.state].transitions){
      this.state=this.config.states[this.state].transitions[event];
      this.history.push(this.state);
      this.lastStep=[];
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
      let arrStates=[];
      if (event===undefined){
      for (var key in this.config.states){
        arrStates.push(key);
        }
      } else {
        for (var key in this.config.states){
          for (var key2 in this.config.states[key].transitions){
            if (key2==event){
              arrStates.push(key);
            }
          }
        }
    }
    return arrStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.history.length==1){
        return false
      } else {
        this.lastStep.push(this.history.pop());
        this.state=this.history[this.history.length-1]
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean} 
     */
    redo() {

      if (this.lastStep.length==0){
        return false;
      } else {
        this.state=this.lastStep.pop();
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history=[this.config.initial]
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
