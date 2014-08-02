
if(device.fxosPhone()){
	var recursos = new Array(); 
	var procesos = new Array(); //5
	var maximo = new Array();
	var disponibles = new Array();
	var utilizados = new Array();
	var necesarios = new Array();
	var contadorFinalizados = 0;
	window.espera=0;
	var contadorCoincidencias=0;

	var seleccionarCaso = function(){
		var caso = Math.floor((Math.random()*3)+1);
		switch (caso){
			case 1:
				recursos = [2,4,1,4]; 
				maximo = [[1,1,0,1],[0,1,0,0],[2,0,0,1],[1,2,1,0],[0,0,0,2]];
				disponibles = [0,1,0,1];
				utilizados = [[0,0,0,1],[0,1,0,1],[2,0,0,0],[0,2,1,0],[0,0,0,1]];
				necesarios = [[1,1,0,0],[0,0,0,1],[0,0,0,1],[1,0,0,0],[0,0,0,1]];
				console.log("caso 1");
				break;
			case 2:
				recursos = [3,5,2,5]; 
				maximo = [[2,2,1,2],[1,2,1,1],[3,1,1,2],[2,3,2,1],[1,0,1,3]]; // ultimo 3
				disponibles = [0,2,1,2];
				utilizados = [[1,1,1,2],[1,2,1,2],[2,1,1,1],[1,3,1,1],[1,0,0,1]];
				necesarios = [[2,2,0,1],[0,0,0,3],[0,0,0,2],[1,0,0,2],[1,0,0,1]];
				console.log("caso 2");
				break;
			case 3:
				recursos = [4,6,3,6]; 
				maximo = [[2,2,0,1],[0,2,0,0],[2,0,2,1],[2,2,1,0],[0,0,2,2]];
				disponibles = [3,1,0,2];
				utilizados = [[0,0,2,1],[2,1,0,2],[2,0,1,0],[0,2,1,1],[0,2,0,1]];
				necesarios = [[1,1,2,0],[2,0,0,1],[0,1,0,1],[1,0,0,1],[0,2,0,1]];
				console.log("caso 3");
				break;
		}
	};

	//Se inicializan listas de procesos y semaforos
	var inicializarProcesos = function(){
		for(var i=0;i<5;i++){
			var temp = {
				id:i,
				semaforo:"NO"
			};
			procesos.push(temp);
		}
	};

	var comprobar = function(){
		//var proceso=procesos[0];
		console.log("finalizados "+contadorFinalizados);
		if(contadorFinalizados<5){
			if(window.espera<4){
				if(procesos[indiceProcesoActual].semaforo == "NO"){
					$("#necesarios tr.remover").remove();
					$("#disponibles tr.remover").remove();
					$("#necesarios").append("<tr class='remover'><td>"+indiceProcesoActual+"</td><td id='necesarios1'>"+necesarios[indiceProcesoActual][0]+"</td><td id='necesarios2'>"+necesarios[indiceProcesoActual][1]+"</td><td id='necesarios3'>"+necesarios[indiceProcesoActual][2]+"</td><td id='necesarios4'>"+necesarios[indiceProcesoActual][3]+"</td><td id='semaforoActual1'>"+procesos[indiceProcesoActual].semaforo+"</td></tr>");
					$("#necesarios"+(espera+1)).css({"color":"red","font-weight":"bold"});
					$("#disponibles").append("<tr class='remover'><td>Sistema</td><td id='disponibles1'>"+disponibles[0]+"</td><td id='disponibles2'>"+disponibles[1]+"</td><td id='disponibles3'>"+disponibles[2]+"</td><td id='disponibles4'>"+disponibles[3]+"</td></tr>");
					$("#disponibles"+(espera+1)).css({"color":"red","font-weight":"bold"});
					if(necesarios[indiceProcesoActual][espera]<=disponibles[espera]){					
						
						$("#utilizados tr.remover").remove();
						$("#utilizados").append("<tr class='remover'><td>"+indiceProcesoActual+"</td><td id='utilizados1'>"+utilizados[indiceProcesoActual][0]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][1]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][2]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][3]+"</td></tr>");
						contadorCoincidencias++;
						$("#estado").html("Verificando proceso "+indiceProcesoActual);
						console.log("Recursos disponibles para "+indiceProcesoActual+" coincidencias "+contadorCoincidencias);
						window.espera++;
					}else{
						
						$("#estado").html("Recursos no disponibles para "+indiceProcesoActual);
						$("#utilizados tr.remover").remove();
						$("#utilizados").append("<tr class='remover'><td>"+indiceProcesoActual+"</td><td id='utilizados1'>"+utilizados[indiceProcesoActual][0]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][1]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][2]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][3]+"</td></tr>");
						console.log("Recursos no disponibles para "+indiceProcesoActual+" "+necesarios[indiceProcesoActual]+" "+disponibles[espera]);
						contadorCoincidencias=0;
						espera=0;
						indiceProcesoActual++;
					}
				}else{
					$("#necesarios tr.remover").remove();
					$("#disponibles tr.remover").remove();
					$("#necesarios").append("<tr class='remover'><td>"+indiceProcesoActual+"</td><td id='necesarios1'>"+necesarios[indiceProcesoActual][0]+"</td><td id='necesarios2'>"+necesarios[indiceProcesoActual][1]+"</td><td id='necesarios3'>"+necesarios[indiceProcesoActual][2]+"</td><td id='necesarios4'>"+necesarios[indiceProcesoActual][3]+"</td><td id='semaforoActual'>"+procesos[indiceProcesoActual].semaforo+"</td></tr>");
					$("#semaforoActual").css({"color":"red","font-weight":"bold"});
				
					$("#estado").html("Proceso "+indiceProcesoActual+" ya ha sido finalizado");

					indiceProcesoActual++;
				}	
				console.log(espera);					
			}else{
				if(contadorCoincidencias==4){
					$("#necesarios tr.remover").remove();
					procesos[indiceProcesoActual].semaforo="SI";
					$("#semaforoActual1").css({"color":"red","font-weight":"bold"});

					$("#necesarios").append("<tr class='remover'><td>"+indiceProcesoActual+"</td><td id='necesarios1'>"+necesarios[indiceProcesoActual][0]+"</td><td id='necesarios2'>"+necesarios[indiceProcesoActual][1]+"</td><td id='necesarios3'>"+necesarios[indiceProcesoActual][2]+"</td><td id='necesarios4'>"+necesarios[indiceProcesoActual][3]+"</td><td id=''>"+procesos[indiceProcesoActual].semaforo+"</td></tr>");
					console.log("Proceso "+indiceProcesoActual+" finalizado");
					$("#necesarios"+espera).css({"color":"red","font-weight":"bold"});
					$("#disponibles tr.remover").remove();
					$("#disponibles").append("<tr class='remover'><td>Sistema</td><td id='disponibles1'>"+disponibles[0]+"</td><td id='disponibles2'>"+disponibles[1]+"</td><td id='disponibles3'>"+disponibles[2]+"</td><td id='disponibles4'>"+disponibles[3]+"</td></tr>");
					
					$("#disponibles"+espera).css({"color":"red","font-weight":"bold"});
					$("#estado").html("Proceso "+indiceProcesoActual+" finalizado");
					for(var i=0;i<4;i++){
						disponibles[i]+=utilizados[indiceProcesoActual][i];
					}
					$("#utilizados tr.remover").remove();
					$("#utilizados").append("<tr class='remover'><td>"+indiceProcesoActual+"</td><td id='utilizados1'>"+utilizados[indiceProcesoActual][0]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][1]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][2]+"</td><td id='utilizados2'>"+utilizados[indiceProcesoActual][3]+"</td></tr>");
					contadorFinalizados++;
					procesos[indiceProcesoActual].semaforo = "SI";
					$("#semaforo"+indiceProcesoActual).html("SI");
					contadorCoincidencias=0;
					espera=0;
					indiceProcesoActual=0;
				}					
			}		
		}else if(contadorFinalizados==5){
			$("#estado").html("El sistema esta en ESTADO SEGURO");
			clearInterval(procesamiento);
		}
	};

	var iniciarSimulacion = function () {
		window.indiceProcesoActual = 0;
	    window.procesamiento = window.setInterval(comprobar, 2000);	
	};

	$("#generarRecursos").bind("click",function(){
		inicializarProcesos();
		seleccionarCaso();
		$("#valorR1").html(recursos[0]);
		$("#valorR2").html(recursos[1]);
		$("#valorR3").html(recursos[2]);
		$("#valorR4").html(recursos[3]);
		$("#disponiblesR1").html(disponibles[0]);
		$("#disponiblesR2").html(disponibles[1]);
		$("#disponiblesR3").html(disponibles[2]);
		$("#disponiblesR4").html(disponibles[3]);
		for(var i=0;i<procesos.length;i++){
			$("#tablaProcesos").append("<tr><td>P"+i+"</td><td> "+necesarios[i][0]+" </td><td> "+necesarios[i][1]+" </td><td> "+necesarios[i][2]+" </td><td> "+necesarios[i][3]+" </td><td id='semaforo"+i+"''>"+procesos[i].semaforo+"</td></tr>");
		}
		console.log(navigator.userAgent.toLowerCase());
	});

	$("#simular").bind("click",function(){
		
		iniciarSimulacion();
	});
}else{
	$("body").css("opacity",0);
}


