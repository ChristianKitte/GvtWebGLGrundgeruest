const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

const vertexShaderSource = `#version 300 es
    
    // uniform vec2 uPointPosition;
    // uniform float uPointSize;    
    
    // Attribute
    in vec2 uPointPosition;
    in float uPointSize;
    
    void main()
    {
        // uPointPosition wird übernommen, der Rest statisch aufgefüllt
        gl_Position=vec4(uPointPosition, 0.0, 1.0);
        gl_PointSize=uPointSize;
        
       //gl_Position=vec4(0.5, 0.5, 0.0, 1.0);
       //gl_PointSize=150.0;
    }
`;

const fragmentShaderSource = `#version 300 es

    precision mediump float;
    out vec4 fragColor;

    void main()
    {
       fragColor=vec4(1.0, 0.0, 0.0, 1.0);
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

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

gl.useProgram(program);

const bufferData = new Float32Array([
    0.1, 0.1, 100,
    0.5, -0.8, 32,
    -0.9, 0.5, 50,
])

// const uPointSizeLocation = gl.getUniformLocation(program, "uPointSize");
// const uPointPositionLocation = gl.getUniformLocation(program, "uPointPosition");
// gl.uniform2f(uPointPositionLocation, 0.8, 0.2);
// gl.uniform1f(uPointSizeLocation, 25.0)

// Location ermitteln
const uPointSizeLocation = gl.getAttribLocation(program, "uPointSize");
const uPointPositionLocation = gl.getAttribLocation(program, "uPointPosition");

// Location enablen
gl.enableVertexAttribArray(uPointSizeLocation);
gl.enableVertexAttribArray(uPointPositionLocation);

// Buffer erzeugen und binden
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

// Übergeben der Daten
// Array Size: 3 Floats each 4 Bytes
gl.vertexAttribPointer(uPointPositionLocation, 2, gl.FLOAT, false, 3 * 4, 0)
gl.vertexAttribPointer(uPointSizeLocation, 1, gl.FLOAT, false, 3 * 4, 2 * 4)

console.log(uPointSizeLocation, uPointPositionLocation);

gl.drawArrays(gl.POINTS, 0, 3);