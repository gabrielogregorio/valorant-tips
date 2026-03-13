import { test, expect } from '@playwright/test';

test.describe('Standard Usage Flow', () => {
  test('should navigate from home to filtered posts', async ({ page }) => {
    // 1. Acessa a rota /
    await page.goto('/');

    // 2. Localiza e clica no mapa Fracture
    // Usando link por nome acessível
    const fractureMap = page.getByRole('link', { name: /Fracture/i });
    await expect(fractureMap).toBeVisible();
    await fractureMap.click();

    // 3. Espera carregar a tela de escolha de agente
    await expect(page.getByText('Agora escolhe um agente')).toBeVisible();

    // 4. Localiza e clica no agente Killjoy
    const killjoyAgent = page.getByRole('link', { name: /Killjoy/i });
    await expect(killjoyAgent).toBeVisible();
    await killjoyAgent.click();

    // 5. Verifica se navegou para /posts com os parâmetros corretos
    // A URL deve conter agents=2963e9995765796512eae7c1 e maps=13a6ae835fe6df413e8bc2cf
    await expect(page).toHaveURL(/\/posts\?agents=2963e9995765796512eae7c1&maps=13a6ae835fe6df413e8bc2cf/);

    // 6. Verifica se o post esperado está na tela
    const expectedPostTitle = 'Impedir o desarme da Spyke plantada nesse ponto';
    await expect(page.getByText(expectedPostTitle)).toBeVisible();

    // 7. Verifica se posts que NÃO deveriam estar aqui (filtro front-end) estão ocultos
    const unrelatedPostTitle = 'Esse pixel permite pegar os atacantes na região do meio';
    await expect(page.getByText(unrelatedPostTitle)).not.toBeVisible();

    const anotherUnrelatedPost = 'Melhores Ultimates #3';
    await expect(page.getByText(anotherUnrelatedPost)).not.toBeVisible();
  });
});
