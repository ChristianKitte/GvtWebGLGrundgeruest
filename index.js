const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

const vertexShaderSource = `#version 300 es
    
    // uniform vec2 uPointPosition;
    // uniform float uPointSize;    
    
    // in von JavaScript mit festgelegten Location/Zeiger)
    layout(location = 1) in vec2 uPointPosition;
    layout(location = 0) in float uPointSize;
    layout(location = 2) in vec3 uColor;
        
    // out zu fragment shader
    out vec3 vColor;
    
    void main()
    {
        // uPointPosition wird übernommen, der Rest statisch aufgefüllt
        gl_Position=vec4(uPointPosition, 0.0, 1.0);
        gl_PointSize=uPointSize;
        
        vColor=uColor;
        
       //gl_Position=vec4(0.5, 0.5, 0.0, 1.0);
       //gl_PointSize=150.0;
    }
`;

const fragmentShaderSource = `#version 300 es

    precision mediump float;
    
    // in vom Vertex Shader
    in vec3 vColor;

    // out zu frame buffer und canvas
    out vec4 fragColor;

    void main()
    {
       fragColor=vec4(vColor,1.0);
    }
`;

const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

// Location/Pointer für die zu übergebenen Variablen selbst festlegen und enablen
// Muss vor dem Linken erfolgen !
uPointSizeLocation = 0;
uPointPositionLocation = 1;
uPointColorLocation = 2;

// gl.bindAttribLocation(program, uPointSizeLocation, "uPointSize");
// gl.bindAttribLocation(program, uPointPositionLocation, "uPointPosition");
// gl.bindAttribLocation(program, uPointColorLocation, "uColor");

// Location/Pointer enablen
gl.enableVertexAttribArray(uPointSizeLocation);
gl.enableVertexAttribArray(uPointPositionLocation);
gl.enableVertexAttribArray(uPointColorLocation);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

gl.useProgram(program);

// Pos 1, 2         Position
// Pos 2            Größe
// Pos 3, 4, 5      RGB Wert
const bufferData = new Float32Array([
    0.1, 0.1, 100, 1, 0, 0,
    0.5, -0.8, 32, 0, 1, 0,
    -0.9, 0.5, 50, 0, 0, 1,
])

// const uPointSizeLocation = gl.getUniformLocation(program, "uPointSize");
// const uPointPositionLocation = gl.getUniformLocation(program, "uPointPosition");
// gl.uniform2f(uPointPositionLocation, 0.8, 0.2);
// gl.uniform1f(uPointSizeLocation, 25.0)

// Location/Pointer für die zu übergebenen Variablen ermitteln und enablen
// Kann nach dem Linken erfolgen !

//const uPointSizeLocation = gl.getAttribLocation(program, "uPointSize");
//const uPointPositionLocation = gl.getAttribLocation(program, "uPointPosition");
//const uPointColorLocation = gl.getAttribLocation(program, "uColor");

//gl.enableVertexAttribArray(uPointSizeLocation);
//gl.enableVertexAttribArray(uPointPositionLocation);
//gl.enableVertexAttribArray(uPointColorLocation);

// Ein neues Buffer erzeugen, binden und mit dem JavaScript Array verbinden
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

// Übergeben der Daten

// Positionsdaten: 2 Byte groß ohne Offset
gl.vertexAttribPointer(uPointPositionLocation, 2, gl.FLOAT, false, 6 * 4, 0)
// Größendaten: 1 Byte groß ohne Offset 2 * 4 Byte (Positionsdaten)
gl.vertexAttribPointer(uPointSizeLocation, 1, gl.FLOAT, false, 6 * 4, 2 * 4)
// Farbdaten: 3 Byte groß ohne Offset 3 * 4 Byte (Positionsdaten + Größendaten)
gl.vertexAttribPointer(uPointColorLocation, 3, gl.FLOAT, false, 6 * 4, 3 * 4)

console.log(uPointSizeLocation, uPointPositionLocation);

gl.drawArrays(gl.POINTS, 0, 3);