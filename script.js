const phoneInput = document.getElementById('phone');

//Máscara para o telefone
  phoneInput.addEventListener('input', function(event) {

    let phone = event.target.value;
    phone = phone.replace('(', '').replace(')','').replace('-', '');

    if(isNaN(phone[phone.length-1])){
        phone = phone.slice(0,phone.length-1);
    }

    if(phone.length > 0 && phone.length <= 2)
        phone = '('+phone;
    else if(phone.length > 2 && phone.length <= 7)
        phone = '('+phone.slice(0,2)+')'+phone.slice(2);
    else if(phone.length > 7)
        phone = '('+phone.slice(0,2)+')'+phone.slice(2,7)+'-'+phone.slice(7);

    document.getElementById('phone').value = phone;
  });

//Validando os dados antes de enviar
const formElement = document.getElementById('register-form');

formElement.addEventListener('submit', function(event) {

    let errors = [];

    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('last-name').value;
    const birthDate = document.getElementById('birth-date').value;
    const state = document.getElementById('state').value;    
    const city = document.getElementById('city').value;    
    const email = document.getElementById('email').value;    
    const phone = document.getElementById('phone').value;    
    const password = document.getElementById('password').value;    
    const password2 = document.getElementById('password2').value;    
    const gender1 = document.getElementById('gender-1').checked;
    const gender2 = document.getElementById('gender-2').checked;
    const gender3 = document.getElementById('gender-3').checked;
    const gender4 = document.getElementById('gender-4').checked;


    document.getElementById('name').style.border = "none";
    document.getElementById('last-name').style.border = "none";
    document.getElementById('birth-date').style.border = "none";
    document.getElementById('state').style.border = "none";
    document.getElementById('city').style.border = "none";
    document.getElementById('email').style.border = "none";
    document.getElementById('phone').style.border = "none";
    document.getElementById('password').style.border = "none";
    document.getElementById('password2').style.border = "none";

    //Validando nome

    if(name.length === 0){
        errors.push({id:'name', error: 'Campo nome não pode estar vazio.'});
    }

    //Validando sobrenome

    if(lastName.length === 0){
        errors.push({id:'last-name', error: 'Campo sobrenome não pode estar vazio.'});
    }

    //Validando data de nascimento
    if(birthDate.length !== 10){
        errors.push({id:'birth-date', error: 'Campo data de nascimento deve possuir uma data válida.'});
    }else{
        const year = parseInt(birthDate[0]+birthDate[1]+birthDate[2]+birthDate[3]);
        const curentYear = (new Date()).getFullYear();

        if(curentYear - year > 140){
            errors.push({id:'birth-date', error: 'Data inválida, não é possível que uma pessoa que nasceu no ano selecionado ainda esteja viva.'});
        }

        if(curentYear - year < 0){
            errors.push({id:'birth-date', error: 'Data inválida, você selecionou uma data futura.'});
        }
    }

    //Validando estado

    if(state.length === 0){
        errors.push({id:'state', error: 'Campo estado/distrito deve estar preenchido.'});
    }

    //Validadando cidade

    if(city.length === 0){
        errors.push({id:'city', error: 'Campo cidade não pode estar vazio.'});
    }


    //Validando email

    if(email.length === 0){
        errors.push({id:'email', error: 'Campo e-mail não pode estar vazio.'});
    }

    //Validando telefone

    if(phone.length !== 14){
        errors.push({id:'phone', error: 'Telefone inválido.'});
    }

    //Validando senhas

    if(password.length < 6){
        errors.push({id:'password', error: 'A senha deve possuir no mínimo 6 caracteres.'});
    }

    if(password !== password2){
        errors.push({id:'password2', error: 'As senhas dos campos senha e confirme a senha devem ser iguais.'});
    }

    //Validando genero

    if(!gender1 && !gender2 && !gender3 && !gender4){
        errors.push({id:false, error: 'Nenhum gênero selecionado.'});
    }
   

    //Redirecionando para próxima página caso tudo esteja certo
    if(errors.length === 0){
        window.location.href = 'sucess.html';
    }else{
        let errorText = '<ul>';

        errors.forEach(element => {
            if(element.id)
                document.getElementById(element.id).style.border = "tomato solid 3px";
            errorText+='<li>'+element.error+'</li>';
        });

        errorText+='</li>';

        Swal.fire({
            title: "<strong>Corrija os seguintes campos para concluir seu cadastro!</strong>",
            icon: "error",
            html: errorText
          });
    }

});