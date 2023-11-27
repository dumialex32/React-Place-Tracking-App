function timeout(s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("The fetch operation took to long");
    }, s * 1000);
  });
}

export async function AJAX(url, method, data) {
  console.log(method);
  const fetchPro =
    method === "POST" && data
      ? fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      : method === "DELETE" && !data
      ? fetch(url, { method: method })
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

export function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
