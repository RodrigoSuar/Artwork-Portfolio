async function test() {
  for (let i = 0; i < 100; i++) {
    const res = await fetch("http://localhost:5000/api/artwork");
    console.log(i, res.status);
  }
}

test();