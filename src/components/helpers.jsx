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

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-EN", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
