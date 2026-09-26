# Branchement boutique DBS ↔ Google Apps Script

## Ordre des priorités

1. **Boutique React** (ce dépôt) — déjà en place  
2. **Tableau de bord** — projet Apps Script séparé (`Index.html` + `Code.gs`)  
3. **Ce câble** — la boutique appelle l’URL Apps Script dès qu’elle est configurée  

## Côté boutique (déjà prêt)

Fichier : `src/services/appsScriptAPI.ts`

| Action | Description |
|--------|-------------|
| `getProducts` | Liste produits (Sheet ou mock) |
| `getProduct` | Détail produit |
| `createOrder` | Nouvelle commande |
| `getOrder` | Suivi commande |
| `updateOrderStatus` | MAJ statut |
| `saveCustomer` | Enregistrer client |
| `processPayment` | Paiement (simulé ou script) |
| `submitProductRequest` | Produit introuvable |
| `subscribeNewsletter` | Newsletter |

## Configuration

```bash
cp .env.example .env
# Éditer .env → coller l’URL Web App Apps Script
npm run dev
```

Sans `VITE_APPS_SCRIPT_URL` → **mode mock** (boutique 100 % locale).

## Côté Apps Script (à coder ensuite)

Le script doit exposer `doPost(e)` et lire :

```json
{ "action": "createOrder", "order": { ... } }
```

Répondre toujours :

```json
{ "success": true, "data": { ... } }
```

ou

```json
{ "success": false, "error": "message" }
```

### Actions attendues

- `getProducts`
- `getProduct` (+ `slug`)
- `createOrder` (+ `order`)
- `getOrder` (+ `orderNumber`)
- `updateOrderStatus` (+ `orderNumber`, `status`)
- `saveCustomer` (+ `customer`)
- `processPayment` (+ `method`, `amount`, `phone`)
- `submitProductRequest`
- `subscribeNewsletter` (+ `email`)

## Déploiement Apps Script

1. script.google.com → nouveau projet  
2. Coller `Code.gs` + lier une Google Sheet  
3. Déployer → Application Web  
4. Exécuter en tant que : **Moi**  
5. Qui a accès : **Tout le monde** (ou restriction selon besoin)  
6. Copier l’URL `/exec` dans `.env`  

## Sécurité (plus tard)

- Clé API secrète dans le payload  
- Validation côté `Code.gs`  
- Ne jamais exposer de données admin sans auth  
