import React, { Component } from 'react';
import millisecondsToHuman from './chronometer'
import {Button , FormControl, ButtonGroup } from 'react-bootstrap';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import  image from './edit.png';
import borrar from './delete.png';


class Main extends Component {
  constructor(){
    super();
    
     this.start = this.start.bind(this);
    this.state = {
      textos: [
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar", tittle: "Estudiar", proyect:"Make it real" ,done: true},
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar" ,tittle: "", proyect: "", done: true}
      ],
      tittle: "",
      proyect: ""
    }
  }


  render() {
    return (
     
        <div className='container'>
         {this.state.textos.map((text, index) =>   
	    				<div className="main">
	    					{ text.done ? this.task(text,index) : this.form(index)}
	    				</div>		
        )}
         <Button bsStyle="info" onClick={this.addTask.bind(this)} >Nueva tarea</Button>
        </div>
    )
  }

task(text,index){
	return(
		<div className="chronomter">
      <div className="submain">
    		<span id="title">{text.tittle}</span>
    		<span id="proyect">{text.proyect}</span>
        <div className="center">{text.texto}</div>
        <div className="image-container">
          <img src={image} alt="my image" onClick={() => this.toggleDone(index)} />
          <img src={borrar} alt="my image" onClick={() => this.delete(index)} />
        </div>
     </div>

  	<Button id="main-button" className={text.state === "Stop" ? "stop" : "start"}bsStyle="info" onClick={text.state === "Stop" ? () => this.stop(text.id,index) : () => this.start(index)} >{text.state}</Button>
    </div>
		)
}

form(index){

	
	return(
	<div className="child">
		<form>
				<div >
					<div >
					 <div >
					 	<span className="proyect">Title</span>
					 </div>
					 </div>
					 <div>
					 	 <FormControl onChange={this.setTitle.bind(this)} className="input" />
					 </div>
					  <div>
					 	<span className="proyect">Proyect</span>
					 </div>
					 <div >
					 	 <FormControl onChange={this.setProyect.bind(this)} className="input" />
					 </div>
					 <div className="group-buttons" >
					    <Button onClick={() => this.setUp(index)}  className="form" id="create"><span>Create</span></Button>
					    <Button className="form" id="cancel"><span>Canacel</span></Button> 
					 </div>
				</div>
			
		</form>
	</div>

	)
}


   start(index){
    this.toggle(index)
   var id = setInterval(() => {
    this.addId(id,index);
    this.setState({
      textos: this.state.textos.map((text,i) => {
        if (index === i){
        text.texto = millisecondsToHuman(text.milisegundos)
        text.milisegundos = text.milisegundos + 1000
        }
        return text
      })
    })
    }
    
    ,1000)  
  }
  addId(id,index){
    this.setState({
      textos: this.state.textos.map((text,i) => {
        if (index === i){
          text.id = id
        }
        return text
        })

    })
  }

  stop(id,index){
    this.toggle(index)
    clearInterval(id);
  }

  addTask(){
    this.setState({
      textos: this.state.textos.concat({texto: millisecondsToHuman(0), id:0, milisegundos: 1000,state: "Comenzar", tittle:""})
    })
  }

  toggle(index){
      this.setState({
      textos: this.state.textos.map((text,i) => {
        if (index === i){
          if (text.state === "Comenzar" || text.state === "Renaudar"){
          	text.state = "Stop"
          }else if (text.state === "Stop"){
			text.state = "Renaudar"
          } 
        }
        return text
        })
    })
  }

  toggleDone(index){
  	this.setState({
  		  textos: this.state.textos.map((text,i) => {
  		  	if(index === i){
  		  		text.done ?  text.done = false : text.done = true 
  		  	}
  		  	return text
        })
  	})
  }


  setTitle(e){
  	this.setState({
  		 tittle: e.target.value
  	})
  }


  setProyect(e){
  	this.setState({
  		 proyect: e.target.value
  	})
  }


  setUp(index){
  	this.toggleDone(index)
		this.setState({
  		  textos: this.state.textos.map((text,i) => {
  		  	if(index === i){
  		  		text.tittle = this.state.tittle 
  		  		text.proyect = this.state.proyect 
  		  	}
  		  	return text
        })
  	})

  }

prueba(index){
		this.setState({
  		  textos: this.state.textos.map((text,i) => {
  		  	if(index === i){
  		  		text.done = true;
  		  	}
  		  	return text
        })
  	})

}

delete(index){
  var tasks = this.state.textos;
      this.setState({
        textos: tasks.slice(0,index).concat(tasks.slice(index + 1))
    })
}

}


export default Main;