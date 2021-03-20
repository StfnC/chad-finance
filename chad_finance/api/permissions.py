from rest_framework import permissions


class IsFromUser(permissions.BasePermission):
    """
    Permission custom qui permet de restreindre la modification et l'acces a un objet
    Elle permet de modifier et voir un objet seulement si l'utilisateur a cree l'objet
    """

    def has_object_permission(self, request, view, obj):
        """
        Verifie si le createur de l'objet est l'utilisateur qui fait une requete
        """
        obj_permission = False
        try:
            # Ce bloc sera valide dans le cas d'un portfolio, car les portfolios ont un attribut owner
            obj_permission = obj.owner == request.user
        except AttributeError as ae:
            # On aura cette erreur si on essaie d'acceder a un trade, alors on regarde le le owner du portfolio auquel le trade appartient
            obj_permission = obj.portfolio.owner == request.user
        finally:
            return obj_permission
