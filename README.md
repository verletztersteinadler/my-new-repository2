gh auth refresh --scopes repo
# или создать PAT с галкой "repo" на https://github.com/settings/tokens и:
echo <TOKEN> | gh auth login --with-token
