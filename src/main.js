import React, { Component } from 'react';
import millisecondsToHuman from './chronometer'
import {Button , FormControl, ButtonGroup } from 'react-bootstrap';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';



class Main extends Component {
  constructor(){
    super();
    
     this.start = this.start.bind(this);
    this.state = {
      textos: [
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar", tittle: "", proyect:"" ,done: true},
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar" ,tittle: "", proyect: "", done: true}
      ],
      tittle: "",
      proyect: ""
    }
  }


  render() {
    return (
     
           <Grid fluid>
         {this.state.textos.map((text, index) =>   

	    	<Row >
	    	<div>{text.done ? "done" : "false"}</div>
	    	<div>{this.state.tittle}</div>
	    	<div>{this.state.proyect}</div>
	          <Col  xs={12} md={3}>
	    			<Row center={"xs"}>
	    				<div className="main">
	    					{ text.done ? this.task(text,index) : this.form(index)}
	    					 

	    				</div>
	    			</Row>
	          </Col>
	        </Row>
        )}
         <Button bsStyle="info" onClick={this.addTask.bind(this)} >Nueva tarea</Button>
    </Grid>
 
    )
  }

task(text,index){
	return(
		<div>
		<span>{text.tittle}</span>
		<span>{text.proyect}</span>
		<Button bsStyle="info" onClick={text.state === "Stop" ? () => this.stop(text.id,index) : () => this.start(index)} >{text.state}</Button>
        <div>{text.texto}</div>
        <Button bsStyle="info" onClick={() => this.toggleDone(index)} >editar</Button>
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
					 	<span className="title">Title</span>
					 </div>
					 </div>
					 <div>
					 	 <input onChange={this.setTitle.bind(this)} className="input" />
					 </div>
					  <div>
					 	<span className="proyect">Proyect</span>
					 </div>
					 <div >
					 	 <input onChange={this.setProyect.bind(this)} className="input" />
					 </div>
					 <div className="group-buttons" >
					    <Button onClick={() => this.setUp(index)}  className="form-buttons" id="create"><span>Create</span></Button>
					    <Button className="form-buttons" id="cancel"><span>Canacel</span></Button> 
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

}


export default Main;