from stargazer.stargazer import Stargazer

def print_table(table: Stargazer, *, pdf=True, html=True) -> None:
    """
    Print stargazer table for Quarto documents.
    Use this function with option 'output: asis'.
    
    Parameters
    ----------
      table: stargazer.stargazer.Stargazer
        A Stargazer()-generated table. 

      pdf: bool
        If True, it calls render_latex() 

      html: bool
        If True, calls render_html()


    Returns
    -------
      : None
        This function is called for its side effect.
    """

    if pdf:
        print(
            ':::: {.content-hidden unless-format="pdf"}',
            '```{=latex}',
            "\n".join(table.render_latex().split("\n")[1:-1]),
            '```',
            '::::',
            sep='\n'
        )

    if html:
        print(
            ':::: {.content-hidden unless-format="html"}',
            table.render_html(),
            '::::',
            sep='\n'
        )