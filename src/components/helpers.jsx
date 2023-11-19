function timeout(s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("The fetch operation took to long");
    }, s * 1000);
  });
}

export async function AJAX(url, data) {
  const fetchPro = data
    ? fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    : fetch(url);

  try {
    await Promise.race([fetchPro, timeout(5)]);

    const res = await fetchPro;
    if (!res.ok) throw new Error("No data to be fetched");

    const data = await res.json();

    if (data === null || (Array.isArray(data) && data.length === 0))
      throw new Error("No data to be fetched");

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
