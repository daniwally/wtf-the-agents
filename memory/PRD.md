# TheAgents.wtf - PRD

## Problema Original
Landing page para venta de agentes IA especializados para empresas latinoamericanas. Powered by WTF Agency.

## User Personas
- **CEOs y Dueños**: Buscan escalar operaciones sin aumentar headcount
- **Gerentes**: Necesitan automatizar tareas repetitivas de sus equipos
- **Target**: Argentina y Latinoamérica

## Requisitos Core
- Paleta: Negro #000000 + Blanco #ffffff + Amarillo #FFD700
- Tipografía: Inter (Thin/Bold contrast)
- Estilo: Editorial premium, Vogue + SaaS moderno
- Mobile-first responsive
- Tono argentino canchero pero profesional
- Multiidioma: Español (principal), Inglés, Portugués

## Implementado

### Frontend (React en Vercel)
- Header con navegación sticky + selector de idioma (ES/EN/PT)
- Hero section: "Tu próximo equipo no tiene LinkedIn" + carrusel de imágenes
- Grid de 9 agentes con cards expandibles
- Sección "Cómo funciona" - 4 pasos
- Pricing con 3 tiers (STARTER, PRO, ENTERPRISE)
- Sección WTF Agency con logos de clientes
- Dream Team section con foto de equipo
- Chatbot demo con Rock
- Formulario de trial
- Footer con CTAs
- Sistema de internacionalización completo (ES/EN/PT)

### Backend (Vercel Serverless - api/index.py)
- POST /api/trial - Captura leads
- POST /api/chat - Demo con Rock usando Anthropic SDK
- GET /api/trials - Lista leads

### Deployment
- **Plataforma**: Vercel
- **Dominio**: theagents.wtf
- **DNS**: GoDaddy
- **Repo**: github.com/daniwally/theagents-landing

## Backlog

### P1
- Configurar ANTHROPIC_API_KEY en Vercel para activar chat de Rock
- Configurar MongoDB Atlas + MONGO_URL en Vercel para guardar leads
- Analytics/tracking de conversión

### P2
- Integrar Calendly real
- Logos reales de clientes
- Testimoniales/case studies
- Video demo de los agentes
- Integración con CRM para leads
