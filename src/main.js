import React, { Component } from 'react';
import millisecondsToHuman from './chronometer'
import {Button , FormControl } from 'react-bootstrap';
import './App.css';

import  image from './edit.png';
import borrar from './delete.png';


class Main extends Component {
  constructor(){
    super();  
     this.start = this.start.bind(this);
    this.state = {
      textos: [
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar", tittle: "Estudiar", proyect:"Make it real" ,done: true,error: false,},
      {texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar" ,tittle: "Hacer Tareas", proyect: "Colegio", done: true,error:false}
      ],
      error: false,
      newtask:false,
      
    }
  }

 /* Renderiza el array de tareas, en cada tarea  muestra el formulario de edicion o la vista del cronometro*/
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



/* retorna el formulario para una nueva tarea */
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
                   <FormControl name="title-input" value={this.state.tittle} className={this.state.error ? "stop input" : "input"} />
                 </div>
                  <div>
                  <span className="proyect">Proyect</span>
                 </div>
                 <div >
                   <FormControl name="proyect-input"  value={this.state.proyect} className={this.state.error ? "stop input" : "input"} />
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




/* retorna la vista principal de tareas */

task(text,index){
	return(
		<div className="chronomter">
      <div className="submain">
    		<span id="title">{text.tittle}</span>
    		<span id="proyect">{text.proyect}</span>
        <div className="center">{text.texto}</div>
        <div className="image-container">
          <img src={image}  onClick={() => this.toggleDone(index)} />
          <img src={borrar} 
           onClick={() => this.delete(text.id,index)} />
        </div>
     </div>

  	<Button id="main-button" className={text.state === "Stop" ? "stop" : "start"}bsStyle="info" onClick={text.state === "Stop" ? () => this.stop(text.id,index) : () => this.start(text,index)} >{text.state}</Button>
    </div>
		)
}






/* retorna el formulario de edicion de tareas */
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
					 	 <FormControl onChange={(e) => this.setTitle(e,index)}  value={task.aux1} className={task.error ? "stop input" : "input"}  name="title-input-form" />
					 </div>
					  <div>
					 	<span className="proyect">Proyect</span>
					 </div>
					 <div >
					 	 <FormControl onChange={(e) => this.setProyect(e,index)}  value={task.aux2} className={task.error ? "stop input" : "input"}  name="proyect-input-form"   />
					 </div>
					 <div className="group-buttons" >
					    <Button type='submit' className="form" id="create"><span> Editar</span></Button>
					    <Button onClick={() => this.toggleDone(index)} className="form" id="cancel"><span>Cancelar</span></Button> 
					 </div>
				</div>
			
		</form>
	</div>

	)
}





/* Comienza el cronometro */
   start(task,index){
    this.toggle(index)
   var id = setInterval(() => {
    this.setState({
      textos: this.state.textos.map((text,i) => {
        if (task.tittle === text.tittle){                           /* No comparo con el indixe porque las tareas se pueden borrar */
        text.texto = millisecondsToHuman(text.milisegundos)
        text.milisegundos = text.milisegundos + 1000
        text.id = id
        }
        return text
      })
    })
    }
    ,1000)  
  }





/* detiene cronometro */
  stop(id,index){
    this.toggle(index)
    clearInterval(id);
  }







/* cambia el estado del array  comenzar, stop o renaudar */
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






/* maneja la variable "done" de cada tarea que a su vez controla si se muestra la vista principal o el formulario de edicion */
  toggleDone(index){
  	this.setState({
  		  textos: this.state.textos.map((text,i) => {
  		  	if(index === i){
  		  		text.done ?  text.done = false : text.done = true 
            text.error = false
            text.aux1 =  text.tittle
            text.aux2 = text.proyect
  		  	}
  		  	return text
        })
  	})
  }








/* Controla y valida el formulario de edicion*/
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
              text.error = false
              text.aux1= titlef
              text.aux2= proyectf
    		  	}
    		  	return text
          })
    	});
        this.toggleDone(index)
    }else{
      this.setState({
      textos: this.state.textos.map((text,i) => {
            if(index === i){
              text.error = true
            }
            return text
          })   
      });
    }
  }








/* controla y valida el formulario que hace nuevas tareas */
prueba(event){
    event.preventDefault()
  	const title = event.target['title-input'].value;
    const proyect = event.target['proyect-input'].value;

  if (this.validate(title,proyect)){
    this.setState({
      textos: this.state.textos.concat({texto: millisecondsToHuman(0), id:0, milisegundos: 1000, state: "Comenzar", tittle: title, proyect: proyect ,done: true}),
      error: false
    });
    this.handle_form()
    }else {
      this.setState({
      error: true
    });
  }
}








/* Validacion de formularios */
validate(title,proyect){
  if (!title || !proyect){
  return false
  }else{
    return true
  }
}







/* maneja la variable que controla si el formulario para crear una tarea debe aparecer o no */
handle_form(){
this.setState({
  newtask: this.state.newtask ? false : true 
});
}







/* borra una tarea y cancela el set inteval */
delete(id,index){
  clearInterval(id)
  var tasks = this.state.textos;
      this.setState({
        textos: tasks.slice(0,index).concat(tasks.slice(index + 1))
    })
}





setTitle(e,index){
this.setState({
  textos: this.state.textos.map((text,i) => {
            if(index === i){
              text.aux1 = e.target.value
            }
            return text
          })
      });

}






setProyect(e,index){
  this.setState({
  textos: this.state.textos.map((text,i) => {
            if(index === i){
              text.aux2 = e.target.value
            }
            return text
          })
      });
}


}


export default Main;