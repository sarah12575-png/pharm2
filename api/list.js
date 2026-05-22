export default async function handler(req, res) {
  const { Q0, Q1, QN, pageNo, numOfRows } = req.query;
  const SERVICE_KEY = process.env.PHARMACY_API_KEY; // Vercel 환경변수
  
  const baseUrl = 'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire';
  const url = `${baseUrl}?serviceKey=${SERVICE_KEY}&Q0=${encodeURIComponent(Q0 || '')}&Q1=${encodeURIComponent(Q1 || '')}&QN=${encodeURIComponent(QN || '')}&pageNo=${pageNo || 1}&numOfRows=${numOfRows || 10}`;

  try {
    const response = await fetch(url);
    const data = await response.text(); // 공공데이터는 기본이 XML이므로 text로 받음
    
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
