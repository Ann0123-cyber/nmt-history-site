export async function* questionStreamNDJSON(jsonPath, batchSize = 5) {
  const response = await fetch(jsonPath);
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let buffer = '';
  let batch = [];

  try {
    while (true) {
      let done, value;
      
      try {
        ({ done, value } = await reader.read());
      } catch (err) {
        console.error('Помилка читання потоку:', err);
        break; 
      }

      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let boundary;
      while ((boundary = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, boundary).trim();
        buffer = buffer.slice(boundary + 1);

        if (line) {
          try {
            const question = JSON.parse(line);
            batch.push(question);
            if (batch.length === batchSize) {
              yield batch;
              batch = [];
            }
          } catch (err) {
            console.error('Помилка парсингу JSON:', err);
          }
        }
      }
    }

    if (batch.length > 0) {
      yield batch; 
    }
  } finally {
    reader.releaseLock(); 
  }
}