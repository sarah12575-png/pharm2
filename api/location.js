export default async function handler(req, res) {
  const { WGS84_LON, WGS84_LAT, pageNo, numOfRows } = req.query;
  const SERVICE_KEY = process.env.PHARMACY_API_KEY;
  
  const baseUrl = 'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire';
  const url = `${baseUrl}?serviceKey=${SERVICE_KEY}&WGS84_LON=${WGS84_LON}&WGS84_LAT=${WGS84_LAT}&pageNo=${pageNo || 1}&numOfRows=${numOfRows || 10}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
