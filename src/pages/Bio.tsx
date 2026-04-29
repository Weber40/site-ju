export default function Bio() {
  return (
    <section className="py-20 bg-brand-beige/20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl font-serif font-bold text-brand-greenDark mb-12 text-center">
          A minha história
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Coluna das Fotos */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-lg border-8 border-white">
              <img src="/src/components/bioju.png" alt="Ju" className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-greenPastel h-32 rounded-2xl"></div> {/* Placeholder para foto 2 */}
                <div className="bg-brand-greenLight h-32 rounded-2xl"></div>  {/* Placeholder para foto 3 */}
            </div>
          </div>

          {/* Coluna do Texto */}
          <div className="text-zinc-700 leading-relaxed space-y-6">
            <p className="text-xl font-medium text-brand-greenDark italic">
              "Cuidar da alimentação é investir na saúde, no bem-estar e na nossa melhor versão"
            </p>
            <p>
             Olá, o meu nome é Joana Teixeira Machado, sou licenciada em Ciências da Nutrição e membro efetivo da Ordem dos Nutricionistas (Cédula Profissional nº 5965N). A minha prática profissional centra-se na promoção de hábitos alimentares saudáveis, com foco na prevenção, controlo e tratamento da doença, contribuindo para a melhoria da saúde e qualidade de vida de pessoas, grupos e comunidades.
Atualmente, desenvolvo atividade em contexto clínico, comunitário e desportivo, colaborando com diferentes instituições, ginásios e escolas, onde realizo avaliação e diagnóstico nutricional, planeamento alimentar individualizado, acompanhamento clínico e educação alimentar. 
Acredito numa nutrição prática, realista e adaptada a cada pessoa, respeitando as suas necessidades, objetivos e estilo de vida. Valorizo uma abordagem próxima e empática, baseada na confiança, no acompanhamento contínuo e na criação de mudanças sustentáveis a longo prazo.
Além da prática clínica, mantenho um forte interesse pela educação alimentar e intervenção comunitária, apostando na formação contínua como ferramenta essencial para oferecer um acompanhamento cada vez mais completo e atualizado.
            </p>
            <h3 className="text-2xl font-serif font-bold text-brand-greenDark pt-4">Formação Académica e Especializações</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-600">
              <li>Licenciatura em Ciências da Nutrição na Universidade de Trás-Os-Montes e Alto Douro</li>
              <li>Alimentação Saudável nos Primeiros Anos de Vida, Faculdade de Ciências da Nutrição e
Alimentação da Universidade do Porto</li>
              <li>Nutrição e Controlo de Peso - Da ciência ao plano alimentar, Academia Clínicas Espregueira</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}