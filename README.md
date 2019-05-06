# DVI-PROJECT
**Título:** Sonic.

**Año:** 2001.

**Plataforma:** GBA(Game Boy Advance)

**Distribuidores:** Sega

**Datos:**
* Es una versión del juego de GBA: Sonic Advance
* Se va a estrenar una película sobre Sonic en 2019.
* Sonic logró ser más famoso que Mickey Mouse en EE.UU.
* Ha tenido juegos para las tres grandes: Nintendo, Microsoft y Sony.
* Hemos partido desde la versión del Mario que realizamos para la práctica 3.

**Objetivos iniciales:**
*	Intentaremos realizar nuestro propio nivel sin tener como referencia un nivel ya creado.
*	Lo más complicado son los loopings y es donde más vamos a centrarnos.
* Implementar a Eggman no debería resultar complicado, pero queremos añadir más dificultad haciendo que lance misiles o vuele.
* Hemos creado una pantalla de título con nuestros nombres, y cabe la posibilidad de poner créditos cuando derrotes a Eggman.

**1. Diseño del juego**

**1.1 Objetivo del juego**
El objetivo es derrotar a Eggman al final del nivel. Estando este mismo lleno de enemigos que intentarán derrotarte. Los anillos otorgan vidas a Sonic. Si te quedas con 0, eres derrotado y tienes que volver a empezar con una vida menos. VIDAS INICIALES? CAERSE?

**1.2 Principales mecánicas**
*	Andar: mecánica básica para Sonic, según mantengas la tecla de andar durante más tiempo sin tropezar o chocar, la velocidad aumentará.
* Bola/atacar: Sonic puede convertirse en bola para atacar a los enemigos y así derrotarlos. En caso de chocar sin estar en bola contra ellos, perderá anillos.
* Acelerar: Simplemente es mantener la tecla de andar sin chocar con ningún objeto ni enemigo.
* Loopings: Al ir rápido, Sonic podrá realizar un looping de 360 grados, convirtiéndose en bola en el proceso.
* Muelle: Un rebote contra este objeto hará saltar a Sonic con mayor altura.
* Salto: Elevarse un poco hacia arriba hará que Sonic se ponga en modo bola.¿PODRA MANTENER ESTE ESTADO SI VA RAPIDO AL SALTAR? ACLARAR LO DEL MODO BOLA
* Cámara: Seguirá a Sonic por el juego excepto en la fase final donde enfocará en el centro haciendo que la batalla contra Eggman se vea mejor.

**1.3 Personajes**
* Sonic: Es el protagonista del juego, teniendo en él las principales mecánicas del juego, mencionadas anteriormente. Correr, saltar, modo bola, muelle, loopings.
* Pingüino horizontal: un pingüino que se mueve de forma horizontal, enemigo simple.
* Tiburón martillo: Un tiburón que sirve como plataforma para Sonic PEROQUESI LO TOCAS AL CUERPO; MUERES?
* Demonio naranja: Un enemigo que se mueve de arriba abajo para intentar derriba a Sonic, solo se le vence en modo bola.
* Payaso malabarista: enemigo que se mueve de izquierda a derecha con mayor velocidad que el pingüino.
* Abeja lanza fuego: enemigo que lanza proyectiles cada determinado tiempo desde una cierta distancia.
* Dr. Eggman: Es el villano principal del nivel, moviéndose más rápido a medida que se le va derrotando. Tiene por ahora un movimiento simple de izquierda a derecha.

**2. Diseño de la implementación**

**2.1 Arreglos**

**2.2 Equipo de trabajo y reparto de tareas**
* Ernesto Vivar Laviña
* Laura Jiménez Fernández
* Beatriz Villegas Sánchez
* Víctor Gómez-Jareño Guerrero

**3 Fuentes y referencias**
* Para la información del juego, hemos usado:
[Información](https://es.wikipedia.org/wiki/Sonic_the_Hedgehog_(serie))
[Juego GBA](https://es.wikipedia.org/wiki/Sonic_Advance)
* Hemos usado esta página para poder jugar a un nivel de referencia:
[Juego](http://www.arcadespot.com/game/sonic-advance/)
* Página usada para sprites y fondos:
[Sprites](https://www.spriters-resource.com/custom_edited/sonicthehedgehogcustoms/)
* Música y sonido de la página:
[Sonidos](https://www.sounds-resource.com/game_boy_advance/sonicadvance/)
