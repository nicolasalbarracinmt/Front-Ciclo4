$("#login").click(function(){
    if($.trim($("#email").val()) == "" || $.trim($("#contrasena").val()) == ""){
        alert("Todos los campos son obligatorios");
    }else{
        let datos = {
            email: $("#email").val(),
            contrasena: $("#contrasena").val()
        }
        $.ajax({
            url:"http://129.151.118.47:8080/api/user/emailexist/"+datos.email,
            method:"GET",
            dataType:"json",
            success:function(res){
                if(res==true){
                    $.ajax({
                        url:"http://129.151.118.47:8080/api/user/"+datos.email+"/"+datos.contrasena,
                        method:"GET",
                        dataType:"json",
                        success:function(res){
                            console.log(res)
                            console.log(res.password + "  "+ datos.contrasena)
                            if(res.email == datos.email && res.name!="NO DEFINIDO"){
                                let data = {
                                    'id': res.id,
                                    'name' : res.name
                                };
                                localStorage.setItem("object_name", JSON.stringify(data));
                                if(res.password == datos.contrasena){
                                    if(res.type == "COORD"){
                                        location.href="coordinador.html";
                                    } else{
                                        location.href="cliente.html";
                                    }
                                    
                                }
                            }else{
                                console.log(res);
                                alert("Datos incorrectos, intente de nuevo");
                            }
                        }
                    });
                }else{
                    alert("El correo ingresado no está registrado")
                    console.log(res)
                    document.getElementById('email').value=null;
                    document.getElementById('contrasena').value=null;
                }
            },
            error:function(){
                alert("Ocurrio un error, vuelva a intentarlo")
            }
        });
        
    }
});


$("#guardar").click(function(){
    if($.trim($("#emailRegistro").val()) == "" || $.trim($("#usuarioRegistro").val()) == "" || $.trim($("#contrasenaRegistro").val()) == "" || $.trim($("#contrasenaRegistro2").val()) == ""){
        alert("Por favor ingrese todos los campos");
    }else{
        if($("#contrasenaRegistro").val() == $("#contrasenaRegistro2").val()){
            let datos = {
                email: $("#emailRegistro").val(),
                password: $("#contrasenaRegistro").val(),
                name: $("#usuarioRegistro").val()
            }
            $.ajax({
                url:"http://129.151.118.47:8080/api/user/new",
                method:"POST",
                dataType:"json",
                data:JSON.stringify(datos),
                contentType:"application/json",
                Headers:{
                    "Content-Type":"application/json"
                },
                statusCode: {
                    201: function(res){
                        console.log(res);
                        if(res.id==null){
                            alert("El correo o usuario ingresados, ya se encuentran registrados");
                        }else{
                            alert("Usuario registrado satisfactoriamente");
                            $("#exampleModal").modal('hide');
                        }
                    }
                }
            });
        }else{
            alert("Las contraseñas no coinciden");
        }
    }
});