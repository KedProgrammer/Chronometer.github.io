import React, { Component } from 'react';
import millisecondsToHuman from './chronometer'
import {Button , FormControl, ButtonGroup } from 'react-bootstrap';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import  image from './edit.png';
import borrar from './delete.png';


class Main extends Component {
  constructor(props){
    super(props);
    
     this.start = this.start.bind(this);
    this.state = {
      textos: [
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar", tittle: "Estudiar", proyect:"Make it real" ,done: true},
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar" ,tittle: "Hacer Tareas", proyect: "Colegio", done: true}
      ],
      error: [{new:false},{form:false}],
      newtask:false
    }
  }


  render() {
    return (
     
        <div className='container'>
         {this.state.textos.map((text, index) =>   
	    				<div className="main">
	    					{ text.done ? this.task(text,index) : this.form(text,index)}
	    				</div>
        )}
        {this.new()}
        {this.state.newtask ? null : <Button bsStyle="info" onClick={this.handle_form.bind(this)} >Nueva tarea</Button> }
        </div>
    )
  }

new(){
  if (this.state.newtask){
    return (
      <div className="main">
        <div className="child">
          <form onSubmit={this.prueba.bind(this)} >
              <div >
                <div >
                 <div >
                  <span className="proyect">Title</span>
                 </div>
                 </div>
                 <div>
                   <FormControl name="title-input" value={this.state.tittle} className={this.state.error[0].new ? "stop input" : "input"} />
                 </div>
                  <div>
                  <span className="proyect">Proyect</span>
                 </div>
                 <div >
                   <FormControl name="proyect-input"  value={this.state.proyect} className={this.state.error[0].new ? "stop input" : "input"} />
                 </div>
                 <div className="group-buttons" >
                    <Button type='submit' className="form" id="create"><span>Crear</span></Button>
                    <Button onClick={this.handle_form.bind(this)} className="form" id="cancel"><span>Cancel</span></Button> 
                 </div>
              </div>
          </form>
         </div>
      </div>
    )
  }
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
          <img src={borrar} al
           onClick={() => this.delete(index)} />
        </div>
     </div>

  	<Button id="main-button" className={text.state === "Stop" ? "stop" : "start"}bsStyle="info" onClick={text.state === "Stop" ? () => this.stop(text.id,index) : () => this.start(index)} >{text.state}</Button>
    </div>
		)
}

form(task,index){
	return(
	<div className="child">
		<form onSubmit={(e) => this.setUp(index,e)} >
				<div >
					<div >
					 <div >
					 	<span className="proyect">Title</span>
					 </div>
					 </div>
					 <div>
					 	 <FormControl  value={task.tittle} className={this.state.error[1].form ? "stop input" : "input"}  name="title-input-form" />
					 </div>
					  <div>
					 	<span className="proyect">Proyect</span>
					 </div>
					 <div >
					 	 <FormControl  value={task.proyect} className={this.state.error[1].form ? "stop input" : "input"}  name="proyect-input-form"   />
					 </div>
					 <div className="group-buttons" >
					    <Button type='submit' className="form" id="create"><span> Editar</span></Button>
					    <Button onClick={() => this.toggleDone(index)} className="form" id="cancel"><span>Canacel</span></Button> 
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





  setUp(index,e){
    e.preventDefault();
  const titlef = e.target['title-input-form'].value;
  const proyectf = e.target['proyect-input-form'].value;

    if (this.validate(titlef,proyectf)){
  		this.setState({
    		  textos: this.state.textos.map((text,i) => {
    		  	if(index === i){
    		  		text.tittle = titlef
    		  		text.proyect = proyectf 
    		  	}
    		  	return text
          }),
          error: this.state.error.map((text,i) => {
          if (i === 1){
             text.form = false
          }
          return text
          })
    	});
        this.toggleDone(index)
    }else{
      this.setState({
        error: this.state.error.map((text,i) => {
          if (i === 1){
             text.form = true
          }
          return text
          })
      });
    }
  }






prueba(event){
  event.preventDefault()
	const title = event.target['title-input'].value;
const proyect = event.target['proyect-input'].value;

if (this.validate(title,proyect)){
this.setState({
    textos: this.state.textos.concat({texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar", tittle: title, proyect: proyect ,done: true}),
    error: this.state.error.map((text,i) => {
          if (i === 0){
             text.new = false
          }
          return text
          })
  });
  this.handle_form()
  }else {
    this.setState({
    error: this.state.error.map((text,i) => {
          if (i === 0){
             text.new = true
          }
          return text
          })
  });
  }
}

validate(title,proyect){
  if (!title || !proyect){
  return false
}else{
  return true
  }
}

handle_form(){
this.setState({
  newtask: this.state.newtask ? false : true 
});
}



delete(index){
  var tasks = this.state.textos;
      this.setState({
        textos: tasks.slice(0,index).concat(tasks.slice(index + 1))
    })
}




}


export default Main;