import universal from './universal.js';
import coris from './coris.js';
import { Builder, By, until, Key, Select } from 'selenium-webdriver';
let driver = await new Builder().forBrowser('chrome').build();
let fecha_inicio_viaje = '20/10/2024'
let fecha_fin_viaje = '30/10/2024'
let edades_pasajeros = [20]
async function interactWithWebsite() {
try{
    // Abre la página
    await driver.get('https://ar.ec.universal-assistance.com/Emision/Login');

    // Espera que la página cargue (por ejemplo, hasta que aparezca un campo de texto)
    let userField = await driver.wait(until.elementLocated(By.id('Usuario')), 10000);
    let passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
    let buttonClick = await driver.wait(until.elementLocated(By.id('chkCondiciones')), 10000);
    let buttonIngresar = await driver.wait(until.elementLocated(By.xpath('//*[@id="formLogIn"]/div[4]/button')), 10000);

    // Ingresar texto en un campo
    await userField.sendKeys('CAUCINOFRANCISCO');
    await passwordField.sendKeys('Abcd1234*');
    await buttonClick.click();
    await buttonIngresar.click();

    let btnTipoProd = await driver.wait(until.elementLocated(By.xpath('//*[@id="formSeleccionarPrefiltroTipoProducto"]/div/div[1]/div[2]/button')), 10000);
    btnTipoProd.click()        
    let btnFolleto = await driver.wait(until.elementLocated(By.xpath('//*[@id="bs-select-1-0"]')), 10000);
    btnFolleto.click()        
    let btnTipoViaje = await driver.wait(until.elementLocated(By.xpath('//*[@id="PrefiltroSelect"]/div/div/div/div/a')), 10000);
    btnTipoViaje.click()        
    let btnUnviaje = await driver.wait(until.elementLocated(By.xpath('//*[@id="ulPrefiltros"]/li[1]/a')), 10000);
    btnUnviaje.click()        
    let btnContinue = await driver.wait(until.elementLocated(By.xpath('//*[@id="formSeleccionarPrefiltroTipoProducto"]/div/div[3]/button')), 10000);
    btnContinue.click()  
    let btnLugar = await driver.wait(until.elementLocated(By.xpath('//*[@id="formCotizacion"]/div/div[1]/div/div[4]/div[2]/button')), 10000);
    btnLugar.click()  
    let btnDestino = await driver.wait(until.elementLocated(By.xpath('//*[@id="bs-select-3-0"]')), 10000);
    btnDestino.click()
    let inputFechaInicio = await driver.wait(until.elementLocated(By.xpath('//*[@id="FechaInicio"]')), 10000);
    inputFechaInicio.clear()
    inputFechaInicio.sendKeys(fecha_inicio_viaje)
    let inputFechaFin = await driver.wait(until.elementLocated(By.xpath('//*[@id="FechaFin"]')), 10000);
    inputFechaFin.clear()
    inputFechaFin.sendKeys(fecha_fin_viaje)
    let ddownViajeros = await driver.wait(until.elementLocated(By.xpath('//*[@id="divCargarEdades"]/div[1]/div[2]/button')), 10000);
    ddownViajeros.click()
    let btnCant = await driver.wait(until.elementLocated(By.xpath(`//*[@id="bs-select-4-${edades_pasajeros.length - 1}"]`)), 10000);
    btnCant.click()

    for (let i = 0; i < edades_pasajeros.length; i++) {
        let inputEdad = await driver.wait(until.elementLocated(By.xpath(`//*[@id="edades"]/input[${i+1}]`)), 5000);
        inputEdad.sendKeys(edades_pasajeros[i]);    
    }
    let btnCotizar = await driver.wait(until.elementLocated(By.xpath('//*[@id="formCotizacion"]/div/div[2]/button')), 10000);
    btnCotizar.click()
}
catch (error) {
    console.log('Error:', error);
}

try{
    await driver.switchTo().newWindow('tab');
    await driver.get('https://agencias.europ-assistance.com.ar/');

    // Busca elementos, llena los campos de usuario y contraseña
    let usr = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-auth/app-login/section/div/div/div/div/form/div/div[2]/input')), 5000);
    await usr.sendKeys('Julian');  // Reemplaza 'usuario' con tu valor de variable

    let pswrd = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-auth/app-login/section/div/div/div/div/form/div/div[3]/input')), 5000);
    await pswrd.sendKeys('Asistencia2025$');  // Reemplaza 'contra' con tu valor de variable

    // Haz clic en el botón de ingresar
    let btnIngresar = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-auth/app-login/section/div/div/div/div/form/div/div[5]/div/button')), 5000);
    await btnIngresar.click();

    // Espera 2 segundos antes de interactuar con el menú
    await driver.sleep(2000);

    // Haz clic en el botón del menú "Emisión"
    let btnEmision = await driver.wait(until.elementLocated(By.xpath('//*[@id="main_navbar"]/div/perfect-scrollbar/div/div[1]/span[2]/ul[4]/li/a')), 5000);
    await btnEmision.click();

    await driver.sleep(2000);

    // Haz clic en el submenú "Cotización"
    let btnCotizacion = await driver.wait(until.elementLocated(By.xpath('//*[@id="main_navbar"]/div/perfect-scrollbar/div/div[1]/span[2]/ul[4]/li/ul/li[1]/a')), 5000);
    await btnCotizacion.click();

    await driver.sleep(2000);

    // Selecciona el lugar de destino del dropdown
    let select_element = await driver.wait(until.elementLocated(By.xpath('//*[@id="pcoded"]/div[2]/div/div/div/div/div/div/app-cotizacion-search/div[1]/div/app-card/div/div[2]/div/form/div[2]/div[2]/select')), 5000);
    let select = new Select(select_element);
    await select.selectByValue('3');  // Reemplaza 'dest' con el valor de variable que necesites

    // Ingresa fechas de viaje
    let fInicio = await driver.wait(until.elementLocated(By.xpath('//*[@id="pcoded"]/div[2]/div/div/div/div/div/div/app-cotizacion-search/div[1]/div/app-card/div/div[2]/div/form/div[2]/div[3]/div[1]/input')), 5000);
    await fInicio.sendKeys(fecha_inicio_viaje);  // Reemplaza con el valor de tu fecha de inicio

    let fFin = await driver.wait(until.elementLocated(By.xpath('//*[@id="pcoded"]/div[2]/div/div/div/div/div/div/app-cotizacion-search/div[1]/div/app-card/div/div[2]/div/form/div[2]/div[4]/div[1]/input')), 5000);
    await fFin.sendKeys(fecha_fin_viaje);  // Reemplaza con el valor de tu fecha de fin

    // Agregar edades de los pasajeros
    for (let i = 0; i < edades_pasajeros.length; i++) {
        let btnSumar = await driver.wait(until.elementLocated(By.xpath('//*[@id="pcoded"]/div[2]/div/div/div/div/div/div/app-cotizacion-search/div[1]/div/app-card/div/div[2]/div/form/div[5]/div[1]/ng-number-picker/div/div[2]')), 5000);
        await btnSumar.click();
    }

    for (let i = 0; i < edades_pasajeros.length; i++) {
        let inputEdad = await driver.wait(until.elementsLocated(By.xpath(`//*[@id="pcoded"]/div[2]/div/div/div/div/div/div/app-cotizacion-search/div[1]/div/app-card/div/div[2]/div/form/div[5]/div[${i + 2}]/input`)), 5000);
        await inputEdad[0].clear();
        await inputEdad[0].sendKeys(edades_pasajeros[i]);
    }

    // Haz clic en el botón "Cotizar"
    let cotizar = await driver.wait(until.elementLocated(By.xpath('//*[@id="pcoded"]/div[2]/div/div/div/div/div/div/app-cotizacion-search/div[1]/div/app-card/div/div[2]/div/form/div[7]/div[3]/button')), 5000);
    await cotizar.click();
}
catch (error) {
    console.log('Error:', error);
}
try{
    await driver.switchTo().newWindow('tab');
    await driver.get('https://agencias.assistcard.com/ar');
    // Espera hasta que el campo de usuario esté presente
    let usr = await driver.wait(until.elementLocated(By.xpath('//*[@id="login-form"]/div[1]/input')), 5000);
    await usr.sendKeys('CAUCINOL');

    // Ingresa la contraseña
    let pswrd = await driver.wait(until.elementLocated(By.xpath('//*[@id="login-form"]/div[2]/div[1]/input')), 5000);
    await pswrd.sendKeys('Asistencia2023*');

    // Clic en el botón de ingresar
    let btnIngresar = await driver.wait(until.elementLocated(By.xpath('//*[@id="loginbutton"]')), 5000);
    await btnIngresar.click();

    // Selecciona el tipo de viaje
    let btnTipoViaje = await driver.wait(until.elementLocated(By.xpath('//*[@id="frmQuoter"]/div[1]/label[1]/span')), 5000);
    await btnTipoViaje.click();

    // Clic en el campo de destino
    let d = await driver.wait(until.elementLocated(By.xpath('//*[@id="fieldDestinationDrop_Emisivo"]')), 5000);
    await d.click();

    // Selecciona el lugar de destino
    let l = await driver.wait(until.elementLocated(By.xpath(`//*[@id="IdDestination_Emisivo"]/option[10]`)), 5000);
    await l.click();

    // Calcula la cantidad de días entre las fechas de inicio y fin
    fecha_inicio_viaje = fecha_inicio_viaje.split('/').reverse().join('/');
    fecha_fin_viaje = fecha_fin_viaje.split('/').reverse().join('/');
    let fechaInicio = new Date(fecha_inicio_viaje);
    let fechaFin = new Date(fecha_fin_viaje);
    let cantDias = ((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    
    // Ingresa la cantidad de días
    let cantDiasInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="frmQuoter"]/div[4]/div/div[1]/div/input[1]')), 5000);
    await cantDiasInput.clear();
    await cantDiasInput.sendKeys(cantDias);

    // Agrega más pasajeros si es necesario
    for (let i = 1; i < edades_pasajeros.length; i++) {
        let btnSumar = await driver.wait(until.elementLocated(By.xpath('//*[@id="sumpax"]')), 5000);
        await btnSumar.click();
        await driver.sleep(1000); // Pausa de 1 segundo entre clicks
    }

    // Ingresa las edades de los pasajeros
    let inputEdad = await driver.wait(until.elementsLocated(By.className('edad')), 5000);
    for (let i = 0; i < inputEdad.length; i++) {
        await inputEdad[i].sendKeys(edades_pasajeros[i]);
    }
    
    // Haz clic en el botón de cotizar
    let cotizar = await driver.wait(until.elementLocated(By.xpath('//*[@id="frmQuoter"]/div[9]/button')), 5000);
    await cotizar.click();
}catch (error) {
    console.log('Error:', error);
}
}

// Ejecutar la función
interactWithWebsite();
